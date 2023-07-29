'use client';

import { Button, Stack, Flex, List, ListItem } from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setCards } from '../store/cardsSlice';
import type { FlashCardResult, FlashCardsResult } from '../../utils/cards';
import type { CreateCardResult, DeleteCardResult } from './actions';

export function CardList({
    cardsList,
    selectedCard,
    createCard,
    deleteCard,
    selectCard,
    handleSetCards,
    handleSetCardError,
    cardError,
}: {
    cardsList: FlashCardsResult;
    cardError: {error: string};
    handleSetCards: (cards: FlashCardsResult) => void;
    handleSetCardError: (error: { error: string}) => void;
    selectedCard: FlashCardResult | null;
    createCard: () => Promise<CreateCardResult>;
    deleteCard: (cardID: string) => Promise<DeleteCardResult>;
    selectCard: (card: FlashCardResult | null) => void;
}) {
    
  /*const dispatch = useAppDispatch();
    const cardsList = useAppSelector((state) => state.cards.cardsList);*/
    const selectedRef = useRef<HTMLLIElement | null>(null);

    const createCardHandler = async () => {
        try {
            let createdCard = await createCard();
            //dispatch(setCards([...cardsList, createdCard]));
            handleSetCards([...cardsList, createdCard]);
            handleSetCardError({ error: '' });
            selectCard(createdCard);
            //scrolls to last selected card, props is not coming down fast enough?
        } catch (e) {
            console.error(e);
            handleSetCardError({ error: 'Error creating card' });
        }
    };

    const deleteCardHandler = async (e: any) => {
        try {
            if (selectedCard) {
                let cardID = selectedCard?.id;
                await deleteCard(cardID);
                let updatedCardsList = [...cardsList];
                let index = cardsList.findIndex((card: FlashCardResult) => card.id === cardID)
                updatedCardsList.splice(index, 1);
                handleSetCards(updatedCardsList);
                let previousCard: FlashCardResult | null =
                    updatedCardsList.length > 0
                        ? (index < updatedCardsList.length ? updatedCardsList[index] : updatedCardsList[updatedCardsList.length - 1])
                        : null;
                selectCard(previousCard);
                handleSetCardError({ error: '' });
            }
        } catch (e) {
            console.error(e);
            handleSetCardError({ error: 'Error deleting card' });
        }
    };

    const selectCardHandler = (e: any) => {
        let cardID = e.target.id;
        let pickedCard = cardsList[cardsList.findIndex((card: FlashCardResult) => card.id === cardID)];
        selectCard(pickedCard);
    };

    const cardItemCSS = 'p-3 cursor-pointer';

    useEffect(() => {
      selectedRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedCard])

    return (
        <Stack className="p-6" spacing={6}>
            <List id="flashcards-list" className="w-64 overflow-y-scroll h-72 mb-5 rounded-md">
                {cardsList.map((card: FlashCardResult) => (
                    <ListItem
                        key={card.id}
                        id={card.id}
                        onClick={selectCardHandler}
                        className={
                            selectedCard?.id === card.id
                                ? `${cardItemCSS} bg-green-400 text-gray-50`
                                : `${cardItemCSS} hover:bg-green-400 hover:text-gray-50`
                        }
                        ref={selectedCard?.id === card.id ? selectedRef : null}
                    >
                        {card.question}
                    </ListItem>
                ))}
            </List>
            <Flex justify="flex-start" gap={3}>
                <Button onClick={createCardHandler}>Add Card</Button>
                <Button onClick={deleteCardHandler}>Delete Card</Button>
            </Flex>
            {cardError.error.length > 0 && <p className="text-red-700">{cardError.error}</p>}
        </Stack>
    );
}
