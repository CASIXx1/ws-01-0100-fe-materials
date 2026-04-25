import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const taro = await prisma.user.create({
    data: {
      email: "taro@example.com",
      name: "Taro",
      posts: {
        create: [
          {
            title: "Prisma 入門",
            content: "Prisma は型安全に DB を扱える ORM です",
            published: true,
          },
          {
            title: "PostgreSQL メモ",
            content: "Docker 上で PostgreSQL を起動しました",
            published: false,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });

  const hanako = await prisma.user.create({
    data: {
      email: "hanako@example.com",
      name: "Hanako",
    },
  });

  console.log("seed completed");
  console.log({ taro, hanako });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
