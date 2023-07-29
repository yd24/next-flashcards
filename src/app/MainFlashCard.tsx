'use client';

import { useState, useEffect } from 'react';
import { Card, Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from './hooks';
import type { getCards } from '../utils/cards';
import { getRandom } from '../utils/random';
import type { FlashCard } from './common/FlashCard';

export function MainFlashCard({
    cards,
    currentCard,
    flipped,
    flipCard,
}: {
    cards: Awaited<ReturnType<typeof getCards>>;
    currentCard: FlashCard | null;
    flipped: boolean;
    flipCard: () => void;
}) {
    /*let cards: FlashCard[] = useAppSelector(state => state.cards.cardsList);*/

    return (
        <>
            <Card
                width={[200, 300, 600]}
                height={[300, 400, 400]}
                align="center"
                justify="center"
                onClick={flipCard}
                p={5}
            >
                {currentCard ? (
                    <p>{!flipped ? `${currentCard?.question}` : `${currentCard?.answer}`}</p>
                ) : (
                    <Spinner />
                )}
            </Card>
        </>
    );
}
