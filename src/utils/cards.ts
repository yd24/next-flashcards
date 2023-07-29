import { cache } from "react";
import { prisma } from '../db';

export const getCards = cache(() => {
    return prisma.card.findMany();
});

export type FlashCardsResult = Awaited<ReturnType<typeof getCards>>
export type FlashCardResult = FlashCardsResult[number]
