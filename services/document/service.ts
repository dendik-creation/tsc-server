import { db } from "@/lib/db";

export const getDocumentAll = async () => {
  return await db.documentReference.findMany();
};
