import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import React from "react";

const Admin = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (session?.user) {
    return <div>Admin page - welcome back {session?.user.username}</div>;
  }
  return <h2>Please login to see the admin page</h2>;
};

export default Admin;
