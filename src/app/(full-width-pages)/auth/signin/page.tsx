import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arraya Dashboard Login | ArrayaAdmin Dashboard",
  description: "Welcome to Arraya Admin Dashboard",
};

export default function SignIn() {
  return <SignInForm />;
}
