import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const db = globalForPrisma.prisma || prisma;
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
