'use client';

import { Box, Card, Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from './hooks';
import { getRandom } from '../utils/random';

import type { FlashCard } from './common/FlashCard';
import type { getCards } from '../utils/cards';

export function MainFlashCard({
    currentCard,
    animateFlip
}: {
    currentCard: FlashCard | null;
    animateFlip: () => void;
}) {

    return (
        <>
            <Box width={[200, 300, 600]} height={[300, 400, 400]} className="card">
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
