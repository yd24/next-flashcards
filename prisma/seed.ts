import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const createCard = await prisma.card.create({
    data: {
      question: "What's wombo?",
      answer: 'He wombo, she wombo.',
      learned: false,
    },
  });

  const createCard2 = await prisma.card.create({
    data: {
      question: "Knock knock.",
      answer: `Who's there?`,
      learned: false,
    },
  });

  const createCard3 = await prisma.card.create({
    data: {
      question: `Where'd you go?`,
      answer: `I miss you so. Seems like it's been forever since you've been gone.`,
      learned: false,
    },
  });

  const createTestUser = await prisma.user.create({
    data: {
      username: 'test',
      password: 'test1',
      cards: [],
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async() => {
    await prisma.$disconnect();
  });