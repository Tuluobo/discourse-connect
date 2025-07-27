import { getAllApplications } from "@/lib/dto/application";
import ApplicationView from "@/components/application/view";

// Force dynamic rendering to avoid static generation issues with auth
export const dynamic = "force-dynamic";

export default async function ApplicationPage() {
  const applications = (await getAllApplications()) || [];
  return <ApplicationView data={applications} />;
}
