'use client';

import { useState, useEffect } from 'react';
import { Box, Card, Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from './hooks';
import { getRandom } from '../utils/random';

import { useAnimate } from 'framer-motion';

import type { FlashCard } from './common/FlashCard';
import type { getCards } from '../utils/cards';

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
    const [scope, animate] = useAnimate();
    const [rotation, setRotation] = useState(360);

    const animateFlip = () => {
        let newRotation = rotation;
        if (newRotation < 360) {
          setRotation(360);
          newRotation = 360;
        } else {
          setRotation(180);
          newRotation = 180;
        }
        flipCard();
        animate([['.card-inner', { rotateY: newRotation }, { duration: 1.2 }]]);
    };

    return (
        <>
            <Box width={[200, 300, 600]} height={[300, 400, 400]} className="card" ref={scope}>
                <Box
                    width="100%"
                    height="100%"
                    pos="relative"
                    sx={{ transformStyle: 'preserve-3d' }}
                    className="card-inner"
                    onClick={animateFlip}
                >
                    <Card
                        className="front-card"
                        align="center"
                        justify="center"
                        p={5}
                        pos="absolute"
                        width="100%"
                        height="100%"
                        sx={{ backfaceVisibility: 'hidden' }}
                    >
                        {currentCard ? <p>{currentCard?.question}</p> : <Spinner />}
                    </Card>
                    <Card
                        className="back-card"
                        align="center"
                        justify="center"
                        p={5}
                        pos="absolute"
                        width="100%"
                        height="100%"
                        transform="rotateY(180deg)"
                        sx={{ backfaceVisibility: 'hidden' }}
                    >
                        {currentCard ? <p>{currentCard?.answer}</p> : <Spinner />}
                    </Card>
                </Box>
            </Box>
        </>
    );
}
