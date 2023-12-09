import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div>
      <h1 className="text-4xl">Home</h1>
      <Link href={"/admin"}>Admin Page</Link>

      <div>
        <h2>Client Session</h2>
        <User />
      </div>
      <div>
        <h2>Sever Session</h2>
        {JSON.stringify(session)}
      </div>
    </div>
  );
}
