import bcrypt from "bcryptjs";
import { useSession } from "next-auth/react";

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12);
}

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export function getUserAuthId() {
  const { data } = useSession();
  const userId = data?.user.id;

  return userId;
}
