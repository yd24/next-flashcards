'use client';

import {
    Box,
    Flex,
    FormControl,
    Input,
    Stack,
    HStack,
    Button,
    Checkbox,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import type { FlashCard } from '../../utils/cards';

interface Props {
    selectedCard: FlashCard | null;
}

export function CardData({ selectedCard }: { selectedCard: FlashCard | null }) {
    const handleUpdate = () => {

    };

    return (
      <FormControl>
        <Stack className="w-96 p-6 grow" spacing={6}>
            <Stack>
                <Text>Question</Text>
                <Input value={selectedCard?.question} />
            </Stack>

            <Stack>
                <Text>Answer</Text>
                <Textarea value={selectedCard?.answer} resize="vertical" />
            </Stack>

            <HStack className="mt-5" justify="space-between">
                <HStack spacing={5}>
                    <Checkbox>Learned</Checkbox>
                    <Checkbox>Format as Code</Checkbox>
                </HStack>
                <Box>
                    <Button>Save Changes</Button>
                </Box>
            </HStack>
        </Stack>
      </FormControl>
    );
}
