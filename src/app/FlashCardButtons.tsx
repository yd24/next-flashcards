'use client';
import { Button, ButtonGroup, useColorModeValue } from '@chakra-ui/react';
import type { FlashCardResult } from '../utils/cards';

export function FlashCardButtons({ animateCardExit, nextCard, currentCard, markLearned, removeLearned }: { animateCardExit: () => void; nextCard: () => void; currentCard: FlashCardResult | null, markLearned: (cardID: string) => void; removeLearned: (cardID: string) => void;}) {
    const handleMarkLearned = () => {
        markLearned(currentCard?.id ?? '');
        removeLearned(currentCard?.id ?? '');
    };

    const handleNextCard = () => {
        nextCard();
        animateCardExit();
    }

    return (
        <ButtonGroup mt={5} spacing={10}>
            <Button onClick={handleMarkLearned} color={'white'} bg="green.400" _hover={{ bg: 'green.200' }} isDisabled={!currentCard}>
                Mark Learned
            </Button>
            <Button color={'white'} bg="green.400" _hover={{ bg: 'green.200' }} onClick={handleNextCard} isDisabled={!currentCard}>
                Next Card
            </Button>
        </ButtonGroup>
    );
}
