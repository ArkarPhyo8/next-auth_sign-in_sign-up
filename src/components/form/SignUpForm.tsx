"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import z from "zod";
// import { useToast } from "@/components/ui/use-toast";

interface SetStateProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const FormSchema = z
  .object({
    username: z.string().min(1, "Username is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have than 8 characters"),
    confirmPassword: z.string().min(1, "Password confirmation required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

const SignUpForm = () => {
  // const { toast } = useToast();
  const router = useRouter();
  const [values, setValues] = useState<SetStateProps | any>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    FormSchema.parse(values);
    const res = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });
    if (res.ok) {
      router.push("/sign-in");
    } else {
      console.log("error");

      // toast({
      //   title: "Error",
      //   description: "Oops! Something when wrong!",
      // });
    }
  };

  const onChange = (e: any) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="bg-slate-700 w-[100%] h-[80vh] mx-auto my-auto">
      <form className="px-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1">
          <label
            className="text-2xl font-medium text-cyan-300"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="border border-cyan-800 px-5 py-2 rounded-md text-xl bg-slate-200"
            type="text"
            placeholder="username"
            name="username"
            value={values["username"]}
            onChange={(e) => onChange(e)}
          />
        </div>
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
        <div className="flex flex-col gap-1">
          <label
            className="text-2xl font-medium text-cyan-300"
            htmlFor="re-password"
          >
            Re-enter your password
          </label>
          <input
            className="border border-cyan-800 px-5 py-2 rounded-md text-xl bg-slate-200"
            type="text"
            placeholder="re-password"
            name="confirmPassword"
            value={values["confirmPassword"]}
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

export default SignUpForm;
