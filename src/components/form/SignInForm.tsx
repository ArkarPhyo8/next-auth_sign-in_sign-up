"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import z from "zod";
// import { useToast } from "@/components/ui/use-toast";

interface SetStateProps {
  email: string;
  password: string;
}

const FormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have than 8 characters"),
});

const SignInForm = () => {
  // const { toast } = useToast();
  const router = useRouter();
  const [values, setValues] = useState<SetStateProps | any>({
    email: "",
    password: "",
  });
  // console.log(values);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    FormSchema.parse(values);

    const signInData = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (signInData?.error) {
      console.log("error");

      // toast({
      //   title: "Error",
      //   description: "Oops! Something when wrong!",
      // });
    } else {
      router.refresh();
      router.push("/admin");
    }
  };

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="bg-slate-700 w-[100%] h-[80vh] mx-auto my-auto">
      <form className="px-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label className="text-2xl font-medium text-cyan-300" htmlFor="email">
            Email
          </label>
          <input
            className="border border-cyan-800 px-5 py-2 rounded-md text-xl bg-slate-200"
            type="text"
            placeholder="Email"
            name="email"
            value={values["email"]}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="text-2xl font-medium text-cyan-300"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-cyan-800 px-5 py-2 rounded-md text-xl bg-slate-200"
            type="text"
            placeholder="Password"
            name="password"
            value={values["password"]}
            onChange={(e) => onChange(e)}
          />
        </div>

        <button className="bg-green-700 w-full mt-5 py-2 rounded-md text-2xl font-medium ">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
