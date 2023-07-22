'use client';

import { Button, Stack, Flex, List, ListItem } from '@chakra-ui/react';
import { useState, useRef } from 'react';
import type { MouseEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setCards } from '../store/cardsSlice';
import type { FlashCard, FlashCards } from '../../utils/cards';
import type { CreateCardResult, DeleteCardResult } from './actions';

export function CardList({
    cards,
    selectedCard,
    createCard,
    deleteCard,
    selectCard,
}: {
    cards: FlashCards;
    selectedCard: FlashCard | null;
    createCard: () => Promise<CreateCardResult>;
    deleteCard: (cardID: string) => Promise<DeleteCardResult>;
    selectCard: (card: FlashCard | null) => void;
}) {
    
  /*const dispatch = useAppDispatch();
    const cardsList = useAppSelector((state) => state.cards.cardsList);*/
    const [cardsList, setCards] = useState(cards);
    const [cardError, setCardError] = useState({ error: '' });
    const selectedRef = useRef<HTMLLIElement | null>(null);

    const createCardHandler = async () => {
        try {
            let createdCard = await createCard();
            //dispatch(setCards([...cardsList, createdCard]));
            setCards([...cardsList, createdCard]);
            setCardError({ error: '' });
            selectCard(createdCard);
            console.log(selectedRef.current);
            selectedRef.current?.scrollIntoView({ behavior: 'smooth' });
        } catch (e) {
            console.error(e);
            setCardError({ error: 'Error creating card' });
        }
    };

    const deleteCardHandler = async (e: any) => {
        try {
            if (selectedCard) {
                let cardID = selectedCard?.id;
                await deleteCard(cardID);
                let updatedCardsList = [...cardsList];
                updatedCardsList.splice(
                    cardsList.findIndex((card: FlashCard) => card.id === cardID),
                    1
                );
                setCards(updatedCardsList);
                let previousCard: FlashCard | null =
                    updatedCardsList.length > 0
                        ? updatedCardsList[updatedCardsList.length - 1]
                        : null;
                selectCard(previousCard);
                setCardError({ error: '' });
            }
        } catch (e) {
            console.error(e);
            setCardError({ error: 'Error deleting card' });
        }
    };

    const selectCardHandler = (e: any) => {
        let cardID = e.target.id;
        let pickedCard = cardsList[cardsList.findIndex((card: FlashCard) => card.id === cardID)];
        selectCard(pickedCard);
    };

    const cardItemCSS = 'p-3 cursor-pointer';

    return (
        <Stack className="p-6" spacing={6}>
            <List id="flashcards-list" className="w-64 overflow-y-scroll h-72 mb-5 rounded-md">
                {cardsList.map((card: FlashCard) => (
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
