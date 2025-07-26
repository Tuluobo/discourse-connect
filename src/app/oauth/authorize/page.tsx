import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { createAuthorizationCode } from "@/lib/oauth/code";
import { SCOPE_VALUES, SupportedScope } from "@/lib/oauth/types";
import { validateAuthorizationRequest } from "@/lib/oauth/validation";
import { prisma } from "@/lib/prisma";
import { AuthorizeForm } from "@/components/oauth/authorize-form";
import { logger } from "@/lib/logger";

interface AuthorizePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AuthorizePage({
  searchParams,
}: AuthorizePageProps) {
  const params = await searchParams;
  const session = await auth();
  // Convert searchParams to URLSearchParams for validation
  const urlParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlParams.set(key, value);
    }
  });

  // Redirect to sign-in if not authenticated
  if (!session || !session.user || !session.user.id) {
    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(`/oauth/authorize?${urlParams.toString()}`)}`,
    );
  }

  // At this point, we know session.user.id exists
  const userId = session.user.id;

  // Validate the authorization request
  const validation = await validateAuthorizationRequest(urlParams);

  if (!validation.valid) {
    const { error } = validation;
    const redirectUri = urlParams.get("redirect_uri");

    if (redirectUri) {
      const errorParams = new URLSearchParams({
        error: error.error,
        ...(error.error_description && {
          error_description: error.error_description,
        }),
        ...(error.state && { state: error.state }),
      });
      redirect(`${redirectUri}?${errorParams.toString()}`);
    } else {
      // If no redirect_uri, show error page
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-bold text-red-600">
              Authorization Error
            </h1>
            <p className="text-gray-600">
              {error.error_description || error.error}
            </p>
          </div>
        </div>
      );
    }
  }

  const { request } = validation;

  // Get application details
  const application = await prisma.application.findUnique({
    where: { clientId: request.client_id },
  });

  if (!application) {
    redirect(
      `${request.redirect_uri}?error=unauthorized_client&state=${request.state}`,
    );
  }

  // Check if user has already authorized this application
  const existingAuthorization = await prisma.authorization.findUnique({
    where: {
      userId_applicationId: {
        userId: session.user.id,
        applicationId: application.id,
      },
    },
  });

  // Parse requested scopes, default to 'read' if none specified
  const requestedScopes = request.scope ? request.scope.split(" ") : ["read"];
  logger.debug(`requestedScopes: ${requestedScopes}`)
  const validScopes = requestedScopes.filter((scope: string) =>
    SCOPE_VALUES.includes(scope as SupportedScope),
  );

  const handleAuthorize = async () => {
    "use server";

    // Create or update authorization record
    await prisma.authorization.upsert({
      where: {
        userId_applicationId: {
          userId,
          applicationId: application.id,
        },
      },
      create: {
        userId,
        applicationId: application.id,
      },
      update: {
        updatedAt: new Date(),
      },
    });

    // Generate authorization code
    const code = await createAuthorizationCode(
      userId,
      application.id,
      request.code_challenge,
      request.code_challenge_method,
    );

    // Build redirect URL with authorization code
    const redirectParams = new URLSearchParams({
      code,
      ...(request.state && { state: request.state }),
    });

    redirect(`${request.redirect_uri}?${redirectParams.toString()}`);
  };

  const handleDeny = async () => {
    "use server";

    const errorParams = new URLSearchParams({
      error: "access_denied",
      error_description: "User denied the authorization request",
      ...(request.state && { state: request.state }),
    });

    redirect(`${request.redirect_uri}?${errorParams.toString()}`);
  };

  // If already authorized and it's not a forced re-authorization, skip consent
  if (existingAuthorization && !urlParams.get("prompt")) {
    return handleAuthorize();
  }

  return (
    <AuthorizeForm
      application={application}
      scopes={validScopes}
      onAuthorize={handleAuthorize}
      onDeny={handleDeny}
    />
  );
}
