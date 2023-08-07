'use client';

import {
    Box,
    Input,
    Stack,
    HStack,
    Button,
    Checkbox,
    Text,
    Textarea,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { FlashCardResult, FlashCardsResult } from '../../utils/cards';
import type { FlashCard } from '../common/FlashCard';
import type { UpdateCardResult } from './actions';

type FormValues = {
    question: string;
    answer: string;
    learned: boolean;
    code: boolean;
};

export function CardData({
    cardsList,
    selectedCard,
    handleSetCards,
    updateCard,
}: {
    cardsList: FlashCardsResult;
    selectedCard: FlashCardResult | null;
    handleSetCards: (cards: FlashCardsResult) => void;
    updateCard: (card: FlashCard) => Promise<UpdateCardResult>;
}) {
    const cardFields = {
        question: selectedCard?.question ?? '',
        answer: selectedCard?.answer ?? '',
        learned: selectedCard?.learned ?? false,
        code: selectedCard?.code ?? false,
    };

    const [updateCardError, setUpdateCardError] = useState({ error: '' });
    const { register, handleSubmit, reset, control } = useForm<FormValues>({
        defaultValues: cardFields,
    });

    const handleUpdate: SubmitHandler<FormValues> = async (data) => {
        let card = {
            id: selectedCard?.id ?? '',
            question: data?.question ?? '',
            answer: data?.answer ?? '',
            learned: data?.learned ?? false,
            code: data?.code ?? false,
        };
        try {
            let updatedCard = await updateCard(card);
            let updatedCardsList = [...cardsList];
            let index = cardsList.findIndex((card: FlashCard) => card.id === updatedCard.id);
            updatedCardsList[index] = updatedCard;
            handleSetCards(updatedCardsList);
            setUpdateCardError({ error: '' });
        } catch (e) {
            console.error(e);
            setUpdateCardError({ error: 'Error saving changes.' });
        }
    };

    useEffect(() => {
        reset(cardFields);
    }, [selectedCard]);

    return (
        <form onSubmit={handleSubmit(handleUpdate)}>
            <Stack className="w-96 p-6 grow" spacing={6}>
                <Stack>
                    <Text>Question</Text>
                    <Input {...register('question')} isDisabled={!selectedCard} />
                </Stack>

                <Stack>
                    <Text>Answer</Text>
                    <Textarea
                        {...register('answer')}
                        resize="vertical"
                        isDisabled={!selectedCard}
                    />
                </Stack>

                <HStack className="mt-5" justify="space-between">
                    <HStack spacing={5}>
                      <Controller 
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Checkbox isDisabled={!selectedCard} isChecked={value} onChange={onChange} onBlur={onBlur}>
                            Learned
                          </Checkbox>
                        )}
                        name='learned'
                      />
                      <Controller 
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Checkbox isDisabled={!selectedCard} isChecked={value} onChange={onChange} onBlur={onBlur}>
                            Format as Code
                          </Checkbox>
                        )}
                        name='code'
                      />
                    </HStack>
                    <Box>
                        <Button type="submit" isDisabled={!selectedCard}>
                            Save Changes
                        </Button>
                    </Box>
                    {updateCardError.error.length > 0 && (
                        <p className="text-red-700">{updateCardError.error}</p>
                    )}
                </HStack>
            </Stack>
        </form>
    );
}
