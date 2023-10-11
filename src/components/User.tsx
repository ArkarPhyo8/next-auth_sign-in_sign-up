"use client";
import { useSession } from "next-auth/react";
import React from "react";

const User = () => {
  const { data: session } = useSession();
  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};

export default User;
