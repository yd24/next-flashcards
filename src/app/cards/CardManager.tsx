'use client';

import { CardList } from './CardList';
import { CardData } from './CardData';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { setCards } from '../store/cardsSlice';
import type { FlashCard, FlashCards } from '../../utils/cards';
import type { CreateCardResult, DeleteCardResult } from './actions';

export function CardManager({
    cards,
    createCard,
    deleteCard,
}: {
    cards: FlashCards;
    createCard: () => Promise<CreateCardResult>;
    deleteCard: (cardID: string) => Promise<DeleteCardResult>;
}) {
    const [selectedCard, setSelectedCard] = useState<FlashCard | null>(null);

    //Check for if someone navigates directly to card manager, fetch card data
    const cardsList = useAppSelector((state) => state.cards.cardsList);
    if (cardsList.length === 0) {
        const dispatch = useAppDispatch();
        dispatch(setCards(cards));
    }

    const selectCard = (card: FlashCard | null) => {
        setSelectedCard(card);
    };

    return (
        <div className="flex justify-flex-start items-flex-start px-12 gap-20">
            <CardList
                createCard={createCard}
                deleteCard={deleteCard}
                selectCard={selectCard}
                selectedCard={selectedCard}
            />
            <CardData selectedCard={selectedCard} />
        </div>
    );
}
