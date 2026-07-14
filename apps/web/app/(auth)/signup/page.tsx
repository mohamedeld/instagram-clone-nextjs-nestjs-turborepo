import React from "react";
import Link from "next/link";
import { SignUpForm } from "@/components/auth/signup-form";

const SignUpPage = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-2 mt-6">
        <h2 className=" text-3xl font-extrabold text-foreground">
          Create Your Account
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Already have an account?{" "}
          <Link
            prefetch={true}
            href="/login"
            className="text-primary font-medium hover:text-primary/90"
          >
            Log in
          </Link>
        </p>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
