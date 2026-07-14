"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "./auth-layout";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { signupSchema, SignupSchema } from "@/schema/signup-schema";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth/client";
import { useRouter } from "next/navigation";

export const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<SignupSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    try {
      const res = await authClient.signUp.email({
        name: data?.name,
        email: data?.email,
        password: data?.password,
      });
      if (res?.data) {
        toast.success(
          "Account created successfully! Please check your email to verify your account.",
        );
        router.push("/login");
      } else {
        toast.error(res?.error?.message);
      }
    } catch (error) {
      toast.error("An error occurred while signing up. Please try again.");
    }
  };
  const isLoading = form.formState.isSubmitting;
  return (
    <AuthLayout
      title="Create Account"
      description="Enter your information to create a new account"
    >
      <form
        id="form-rhf-demo"
        className=""
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup className="space-y-2 mt-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your name"
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
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm your password"
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
