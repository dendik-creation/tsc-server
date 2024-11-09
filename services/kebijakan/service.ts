import { db } from "@/lib/db";
import { DocumentKebijakan } from "@prisma/client";

export const getKebijakanAll = async () => {
  return await db.documentKebijakan.findMany();
};

export const createKebijakan = async (data: DocumentKebijakan) => {
  return await db.documentKebijakan.create({ data });
};

export const updateKebijakan = async (id: number, data: DocumentKebijakan) => {
  return await db.documentKebijakan.update({
    where: {
      id,
    },
    data: {
      documentName: data.documentName,
      documentUrl: data.documentUrl,
    },
  });
};

export const deleteKebijakan = async (id: number) => {
  return await db.documentKebijakan.delete({
    where: {
      id,
    },
  });
};
