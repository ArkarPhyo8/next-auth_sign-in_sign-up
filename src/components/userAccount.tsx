"use client";
import { signOut } from "next-auth/react";
import React from "react";

const UserAccount = () => {
  return (
    <div>
      <button
        onClick={() =>
          signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/sign-in`,
          })
        }
      >
        Sign OUt
      </button>
    </div>
  );
};

export default UserAccount;
