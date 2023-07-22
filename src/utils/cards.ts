import { cache } from "react";
import { prisma } from '../db';

export const getCards = cache(() => {
    return prisma.card.findMany();
});

export type FlashCards = Awaited<ReturnType<typeof getCards>>
export type FlashCard = FlashCards[number]
