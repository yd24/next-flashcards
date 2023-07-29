'use client';

import { CardList } from './CardList';
import { CardData } from './CardData';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setCards } from '../store/cardsSlice';
import type { FlashCardResult, FlashCardsResult } from '../../utils/cards';
import type { FlashCard } from '../common/FlashCard'
import type { CreateCardResult, DeleteCardResult, UpdateCardResult } from './actions';

export function CardManager({
    cards,
    createCard,
    deleteCard,
    updateCard,
}: {
    cards: FlashCardsResult;
    createCard: () => Promise<CreateCardResult>;
    deleteCard: (cardID: string) => Promise<DeleteCardResult>;
    updateCard: (card: FlashCard) => Promise<UpdateCardResult>;
}) {
    const [selectedCard, setSelectedCard] = useState<FlashCardResult | null>(null);
    const [cardsList, setCards] = useState(cards);
    const [cardError, setCardError] = useState({ error: '' });

    //Check for if someone navigates directly to card manager, fetch card data
    //const cardsList = useAppSelector((state) => state.cards.cardsList);
    /*if (cardsList.length === 0) {
        const dispatch = useAppDispatch();
        dispatch(setCards(cards));
    }*/

    const handleSetCards = (cards: FlashCardsResult) => {
      setCards(cards);
    }

    const handleSetCardError = (error: { error: string }) => {
      setCardError(error);
    }

    const selectCard = (card: FlashCardResult | null) => {
        setSelectedCard(card);
    };

    return (
        <div className="flex justify-flex-start items-flex-start px-12 gap-20">
            <CardList
                cardsList={cardsList}
                handleSetCards={handleSetCards}
                cardError={cardError}
                handleSetCardError={handleSetCardError}
                createCard={createCard}
                deleteCard={deleteCard}
                selectCard={selectCard}
                selectedCard={selectedCard}
            />
            <CardData updateCard={updateCard} cardsList={cardsList} selectedCard={selectedCard} handleSetCards={handleSetCards}/>
        </div>
    );
}
