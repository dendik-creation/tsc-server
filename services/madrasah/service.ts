import { db } from "@/lib/db";

export const getMadrasahAll = async () => {
  return await db.madrasah.findMany({
    include: {
      madrasahDocuents: true,
    },
  });
};
