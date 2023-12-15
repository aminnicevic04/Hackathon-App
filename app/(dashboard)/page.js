import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <main>{session?.user?.id}</main>;
}
