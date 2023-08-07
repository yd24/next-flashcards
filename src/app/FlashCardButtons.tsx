'use client';
import { Button, ButtonGroup, useColorModeValue } from '@chakra-ui/react';
import { markLearned } from './actions';
import type { UpdateLearnedResult } from './actions';
import type { FlashCardResult } from '../utils/cards';

export function FlashCardButtons({ nextCard, currentCard, markLearned, removeLearned }: { nextCard: () => void; currentCard: FlashCardResult | null, markLearned: (cardID: string) => void; removeLearned: (cardID: string) => void;}) {
    const handleMarkLearned = () => {
        markLearned(currentCard?.id ?? '');
        removeLearned(currentCard?.id ?? '');
    };

    return (
        <ButtonGroup mt={5} spacing={10}>
            <Button onClick={handleMarkLearned} color={'white'} bg="green.400" _hover={{ bg: 'green.200' }} isDisabled={!currentCard}>
                Mark Learned
            </Button>
            <Button color={'white'} bg="green.400" _hover={{ bg: 'green.200' }} onClick={nextCard} isDisabled={!currentCard}>
                Next Card
            </Button>
        </ButtonGroup>
    );
}
