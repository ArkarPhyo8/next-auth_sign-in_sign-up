import SignInForm from "@/components/form/SignInForm";
import Link from "next/link";
import React from "react";

const SignIn = () => {
  return (
    <div>
      <SignInForm />
      <Link href={"/sign-up"}>Sign up</Link>
    </div>
  );
};

export default SignIn;
