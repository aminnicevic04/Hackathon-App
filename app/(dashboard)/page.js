import { getUserAuthId } from "@/lib/functions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/session";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return <main>{session.user.id}</main>;
}
