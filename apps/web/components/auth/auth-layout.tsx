import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type AuthLayoutProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export const AuthLayout = ({
  children,
  description,
  title,
}: AuthLayoutProps) => {
  return (
    <Card className="max-w-md w-full mx-auto">
      <CardHeader className="text-start">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
