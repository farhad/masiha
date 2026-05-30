import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, type ContentKind } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const databaseUrl =
  process.env.DATABASE_URL ?? "mysql://root:password@127.0.0.1:3306/masiha";

const adapter = new PrismaMariaDb(databaseUrl);

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function getPublishedContent(kind: ContentKind) {
  return prisma.contentItem.findMany({
    where: {
      kind,
      status: "published",
    },
    orderBy: [
      {
        sortOrder: "asc",
      },
      {
        id: "asc",
      },
    ],
    select: {
      id: true,
      slug: true,
      title: true,
      body: true,
      metadata: true,
    },
  });
}
