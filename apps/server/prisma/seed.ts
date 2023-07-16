import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createArenas() {
  const ARENAS = [
    {
      name: "Rookie's corner",
      size: 25,
      minLevel: 1,
      maxLevel: 10,
      maxSlots: 100
    },
    {
      name: 'Proving grounds',
      size: 25,
      minLevel: 10,
      maxLevel: 20,
      maxSlots: 100
    },
    {
      name: "The Warrior's trial",
      size: 25,
      minLevel: 20,
      maxLevel: 50,
      maxSlots: 100
    },
    {
      name: 'Battlefield of Legends',
      size: 25,
      minLevel: 50,
      maxLevel: 99,
      maxSlots: 100
    }
  ];

  return Promise.all(
    ARENAS.map(arena =>
      prisma.arena.upsert({
        where: { name: arena.name },
        create: arena,
        update: {}
      })
    )
  );
}

(async function () {
  try {
    await createArenas();
    await prisma.$disconnect();
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
