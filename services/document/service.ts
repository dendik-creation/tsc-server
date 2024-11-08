import { db } from "@/lib/db";
import { DocumentReference } from "@prisma/client";

export const getDocumentAll = async () => {
  return await db.documentReference.findMany();
};

export const createDocument = async (data: DocumentReference) => {
  return await db.documentReference.create({ data });
};

export const updateDocument = async (id: number, data: DocumentReference) => {
  return await db.documentReference.update({
    where: {
      id,
    },
    data: {
      documentName: data.documentName,
    },
  });
};

export const deleteDocument = async (id: number) => {
  return await db.documentReference.delete({
    where: {
      id,
    },
  });
};
