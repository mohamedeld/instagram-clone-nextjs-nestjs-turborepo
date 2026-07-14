"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "./auth-layout";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signInSchema, SignInSchema } from "@/schema/signin-schema";
import { authClient } from "@/lib/auth/client";

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<SignInSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInSchema) => {
    try {
      const res = await authClient.signIn.email({
        email: data?.email,
        password: data?.password,
      });
      if (res?.data) {
        toast.success("Logged in successfully!");
        router.push("/");
      } else {
        toast.error(res?.error?.message);
      }
    } catch (error) {
      toast.error(
        (error as Error)?.message ||
          "An error occurred while logging in. Please try again.",
      );
    }
  };
  const isLoading = form.formState.isSubmitting;
  return (
    <AuthLayout
      title="Login"
      description="Enter your information to login to your account"
    >
      <form
        id="form-rhf-demo"
        className=""
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className="space-y-2 mt-2">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="flex items-start"
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="flex items-start"
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          type="submit"
          className="mt-4 w-full h-10 flex items-center justify-center"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Submit"}
        </Button>
      </form>
    </AuthLayout>
  );
};
