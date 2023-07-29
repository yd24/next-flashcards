'use client';
import { Button, ButtonGroup, useColorModeValue } from '@chakra-ui/react';

export function FlashCardButtons({ nextCard }: { nextCard: () => void }) {
    return (
        <ButtonGroup mt={5} spacing={10}>
            <Button color={'white'} bg="green.400" _hover={{ bg: 'green.200' }}>
                Mark Learned
            </Button>
            <Button color={'white'} bg="green.400" _hover={{ bg: 'green.200' }} onClick={nextCard}>
                Next Card
            </Button>
        </ButtonGroup>
    );
}
