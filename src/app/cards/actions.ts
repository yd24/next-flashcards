'use server';

import { prisma } from '@/db';

export const createCard = async () => {
    const createdCard = await prisma.card.create({
        data: {
            question: 'New Flashcard',
            answer: 'Fill out your answer here.',
            learned: false,
        },
    });
    return createdCard;
};

export const deleteCard = async (cardID: string) => {
    const deletedCard = await prisma.card.delete({
        where: { id: cardID },
    });
    return deletedCard;
};

export type CreateCardResult = Awaited<ReturnType<typeof createCard>>;
export type DeleteCardResult = Awaited<ReturnType<typeof deleteCard>>;
