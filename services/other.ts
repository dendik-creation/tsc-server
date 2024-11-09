import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const generateRandomString = (length: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randString = Array(length)
    .fill(null)
    .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
    .join("");
  return randString;
};

export const resetPassword = async (id: number, newPassword: string) => {
  return await db.user.update({
    where: {
      id,
    },
    data: {
      password: await bcrypt.hash(newPassword, 10),
    },
  });
};
