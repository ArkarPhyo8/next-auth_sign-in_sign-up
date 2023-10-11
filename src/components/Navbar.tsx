import { HandMetal } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import UserAccount from "./userAccount";
import { authOptions } from "@/lib/auth";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href={"/"}>
          <HandMetal />
        </Link>

        {session?.user ? (
          <UserAccount />
        ) : (
          <Link href={"/sign-in"}>Sign In </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
