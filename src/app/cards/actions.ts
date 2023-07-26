'use server';

import { prisma } from '@/db';
import { FlashCard } from '../common/FlashCard';

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

export const updateCard = async (card: FlashCard) => {
  const updatedCard = await prisma.card.update({
    where: { id: card.id },
    data: {
      question: card.question,
      answer: card.answer,
      learned: card.learned,
    }
  })
}

export type CreateCardResult = Awaited<ReturnType<typeof createCard>>;
export type DeleteCardResult = Awaited<ReturnType<typeof deleteCard>>;
