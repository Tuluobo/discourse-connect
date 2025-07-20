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

const formSchema = z.object({
  name: z.string().min(1, { message: "应用名称是必填项" }),
  home: z.string().url({ message: "请输入有效的网站 URL" }),
  logoUri: z
    .string()
    .refine((val) => !val || z.string().url().safeParse(val).success, {
      message: "请输入有效的 Logo URL",
    }),
  description: z.string().optional(),
  redirectUris: z
    .array(
      z.object({
        url: z.string().url({ message: "请输入有效的重定向 URL" }),
      }),
    )
    .min(1, { message: "至少需要一个重定向 URL" }),
  scopes: z.string().min(1, { message: "权限范围是必填项" }),
});

type ApplicationForm = z.infer<typeof formSchema>;

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

  const form = useForm<ApplicationForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          name: currentApplication.name,
          home: currentApplication.home,
          logoUri: currentApplication.logoUri,
          description: currentApplication.description || "",
          redirectUris: currentApplication.redirectUris.map((uri) => ({
            url: uri,
          })),
          scopes: currentApplication.scopes.join(", "),
        }
      : {
          name: "",
          home: "",
          logoUri: "",
          description: "",
          redirectUris: [{ url: "" }],
          scopes: "read",
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
          toast.error("更新失败", {
            description: result.error,
          });
          return;
        }
        toast.success("更新成功", {
          description: "应用信息已成功更新",
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
          toast.error("创建失败", {
            description: result.error,
          });
          return;
        }

        toast.success("创建成功", {
          description: "应用已成功创建",
        });
      }

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.log(`onSubmit error: ${error}`);
      toast.error("创建失败", {
        description: "创建应用时发生未知错误",
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
          <DialogTitle>{isEdit ? "编辑应用" : "创建新应用"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "修改应用信息" : "创建一个新的 OAuth 应用"}
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
                      应用名称 <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="我的应用"
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
                      应用描述
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="应用的详细描述（可选）"
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
                      网站 URL <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com"
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
                      Logo URL <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/logo.png"
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
                    重定向 URL <span className="text-red-500">*</span>
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
                                placeholder="https://example.com/callback"
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
                    添加重定向 URL
                  </Button>
                  <p className="text-muted-foreground text-xs">
                    应用授权后用户重定向的地址
                  </p>
                </div>
              </div>

              <FormField
                control={form.control}
                name="scopes"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-start space-y-0 gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 pt-2 text-right">
                      权限范围 <span className="text-red-500">*</span>
                    </FormLabel>
                    <div className="col-span-4 space-y-2">
                      <FormControl>
                        <Input placeholder="read, write, admin" {...field} />
                      </FormControl>
                      <p className="text-muted-foreground text-xs">
                        用逗号分隔多个权限
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
                ? "更新中..."
                : "创建中..."
              : isEdit
                ? "更新应用"
                : "创建应用"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
