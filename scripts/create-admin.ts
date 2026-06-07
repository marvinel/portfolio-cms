import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "marvinshb@gmail.com";
  const password = "admin123"; // Change this to something secure!
  const name = "Marvin Henriquez";

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      name,
    },
  });

  console.log(`Admin user created: ${user.email}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
