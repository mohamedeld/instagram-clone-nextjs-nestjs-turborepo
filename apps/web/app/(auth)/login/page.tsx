import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="text-center">
      <div className="flex flex-col gap-2 mt-6">
        <h2 className=" text-3xl font-extrabold text-foreground">Login</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Do not have an account?{" "}
          <Link
            prefetch={true}
            href="/signup"
            className="text-primary font-medium hover:text-primary/90"
          >
            Sign up
          </Link>
        </p>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
