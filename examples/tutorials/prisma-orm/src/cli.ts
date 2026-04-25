import { prisma } from "./prisma";

async function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case "user-create": {
      const [email, name] = args;

      if (!email || !name) {
        console.log("usage: npm run cli -- user-create <email> <name>");
        return;
      }

      const user = await prisma.user.create({
        data: { email, name },
      });

      console.log("created user:");
      console.log(user);
      return;
    }

    case "user-list": {
      const users = await prisma.user.findMany({
        orderBy: { id: "asc" },
      });

      console.log("users:");
      console.dir(users, { depth: null });
      return;
    }

    case "user-show": {
      const [id] = args;

      if (!id) {
        console.log("usage: npm run cli -- user-show <id>");
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!user) {
        console.log("user not found");
        return;
      }

      console.log("user:");
      console.log(user);
      return;
    }

    case "user-update": {
      const [id, name] = args;

      if (!id || !name) {
        console.log("usage: npm run cli -- user-update <id> <name>");
        return;
      }

      const user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name },
      });

      console.log("updated user:");
      console.log(user);
      return;
    }

    case "user-delete": {
      const [id] = args;

      if (!id) {
        console.log("usage: npm run cli -- user-delete <id>");
        return;
      }

      const user = await prisma.user.delete({
        where: { id: Number(id) },
      });

      console.log("deleted user:");
      console.log(user);
      return;
    }

    default: {
      console.log(`
commands:
  npm run cli -- user-create <email> <name>
  npm run cli -- user-list
  npm run cli -- user-show <id>
  npm run cli -- user-update <id> <name>
  npm run cli -- user-delete <id>
      `);
    }
  }
}

main()
  .catch((e) => {
    console.error("error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
