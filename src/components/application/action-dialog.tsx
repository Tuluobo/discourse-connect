"use client";

import { useState } from "react";
import {
  createApplicationAction,
  CreateApplicationInput,
  updateApplicationAction,
  UpdateApplicationInput,
} from "@/actions/application";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Application } from "@/lib/dto/application";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const getFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, { message: t("validation.nameRequired") }),
    home: z.string().url({ message: t("validation.validWebsiteUrl") }),
    logoUri: z
      .string()
      .optional()
      .refine((val) => !val || z.string().url().safeParse(val).success, {
        message: t("validation.validLogoUrl"),
      }),
    description: z.string().optional(),
    redirectUris: z
      .array(
        z.object({
          url: z.string().url({ message: t("validation.validRedirectUrl") }),
        }),
      )
      .min(1, { message: t("validation.redirectUrlRequired") }),
    scopes: z.string().min(1, { message: t("validation.scopesRequired") }),
  });

interface Props {
  currentApplication?: Application;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ApplicationsActionDialog({
  currentApplication,
  open,
  onOpenChange,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const isEdit = !!currentApplication;
  const t = useTranslations("application.dialog");
  const formSchema = getFormSchema(t);
  type ApplicationForm = z.infer<typeof formSchema>;

  const form = useForm<ApplicationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          name: currentApplication.name,
          home: currentApplication.home,
          logoUri: currentApplication.logoUri || "",
          description: currentApplication.description || "",
          redirectUris: currentApplication.redirectUris.map((uri) => ({
            url: uri,
          })),
          scopes: currentApplication.scopes.join(", "),
        }
      : {
          name: "",
          home: "",
          description: "",
          redirectUris: [{ url: "" }],
          scopes: "read:user",
        },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "redirectUris",
  });

  const onSubmit = async (values: ApplicationForm) => {
    setIsLoading(true);

    try {
      const redirectUris = values.redirectUris
        .map((item) => item.url.trim())
        .filter((uri) => uri);

      const scopes = values.scopes
        .split(",")
        .map((scope) => scope.trim())
        .filter((scope) => scope);

      if (isEdit && currentApplication) {
        const payload: UpdateApplicationInput = {
          id: currentApplication.id,
          name: values.name,
          home: values.home,
          logoUri: values.logoUri,
          description: values.description,
          redirectUris,
          scopes,
        };
        const result = await updateApplicationAction(payload);
        if (result.error) {
          toast.error(t("toast.updateFailed"), {
            description: result.error,
          });
          return;
        }
        toast.success(t("toast.updateSuccess"), {
          description: t("toast.updateSuccessDesc"),
        });
      } else {
        const payload: CreateApplicationInput = {
          name: values.name,
          home: values.home,
          logoUri: values.logoUri,
          description: values.description,
          redirectUris,
          scopes,
        };

        const result = await createApplicationAction(payload);

        if (result.error) {
          toast.error(t("toast.createFailed"), {
            description: result.error,
          });
          return;
        }

        toast.success(t("toast.createSuccess"), {
          description: t("toast.createSuccessDesc"),
        });
      }

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.log(`onSubmit error: ${error}`);
      toast.error(t("toast.createFailed"), {
        description: t("toast.unknownError"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!isLoading) {
          form.reset();
          onOpenChange(state);
        }
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>
            {isEdit ? t("title.edit") : t("title.create")}
          </DialogTitle>
          <DialogDescription>
            {isEdit ? t("description.edit") : t("description.create")}
          </DialogDescription>
        </DialogHeader>
        <div className="-mr-4 h-[30rem] w-full overflow-y-auto py-1 pr-4">
          <Form {...form}>
            <form
              id="application-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 p-0.5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 pt-2 text-right">
                      {t("fields.name.label")}{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.name.placeholder")}
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 pt-2 text-right">
                      {t("fields.description.label")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t("fields.description.placeholder")}
                        className="col-span-4 resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="home"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 pt-2 text-right">
                      {t("fields.websiteUrl.label")}{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.websiteUrl.placeholder")}
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logoUri"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 pt-2 text-right">
                      {t("fields.logoUrl.label")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("fields.logoUrl.placeholder")}
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1">
                <div className="col-span-2 pt-2 text-left">
                  <label className="text-sm font-medium">
                    {t("fields.redirectUrls.label")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="col-span-4 space-y-2">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`redirectUris.${index}.url`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder={t(
                                  "fields.redirectUrls.placeholder",
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => remove(index)}
                          className="h-10 w-10 shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ url: "" })}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    {t("fields.redirectUrls.addButton")}
                  </Button>
                  <p className="text-muted-foreground text-xs">
                    {t("fields.redirectUrls.description")}
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="scopes"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 pt-2 text-right">
                      {t("fields.scopes.label")}{" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="col-span-4 space-y-2">
                      <FormControl>
                        <Input
                          placeholder={t("fields.scopes.placeholder")}
                          {...field}
                        />
                      </FormControl>
                      <p className="text-muted-foreground text-xs">
                        {t("fields.scopes.description")}
                      </p>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" form="application-form" disabled={isLoading}>
            {isLoading
              ? isEdit
                ? t("buttons.updating")
                : t("buttons.creating")
              : isEdit
                ? t("buttons.update")
                : t("buttons.create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
