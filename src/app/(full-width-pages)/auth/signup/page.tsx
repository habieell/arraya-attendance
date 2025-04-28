import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arraya Dashboard Sign-Up | ArrayaAdmin Dashboard",
  description: "Welcome to Arraya Admin Dashboard",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
