'use server'

import { prisma } from '@/db';

export const markLearned = async (cardID: string) => {
  const updatedCard = await prisma.card.update({
    where: { id: cardID },
    data: {
      learned: true,
    }
  })
  return updatedCard;
}

export type UpdateLearnedResult = Awaited<ReturnType<typeof markLearned>>;