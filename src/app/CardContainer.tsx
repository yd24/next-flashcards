'use client';

import { MainFlashCard } from './MainFlashCard';
import { FlashCardButtons } from './FlashCardButtons';
import { useState, useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { setCards } from './store/cardsSlice';
import type { FlashCardResult, FlashCardsResult } from '../utils/cards';
import { getRandom } from '../utils/random';

export function CardContainer({ cards }: { cards: FlashCardsResult }) {
    /*const dispatch = useAppDispatch();
    dispatch(setCards(props.cards));*/

    let [currentCard, setCurrentCard] = useState<FlashCardResult | null>(null);
    let [flipped, setFlipped] = useState(false);

    const nextCard = () => {
        let card = cards.shift()!;
        setFlipped(false);
        setCurrentCard(card);
        cards.push(card);
    };

    const flipCard = () => {
        setFlipped(!flipped);
    };

    useEffect(() => {
      nextCard();
    }, []);

    return (
        <div className="flex flex-col justify-center items-center grow bg-gray-50 gap-6">
            <MainFlashCard
                cards={cards}
                currentCard={currentCard}
                flipped={flipped}
                flipCard={flipCard}
            />
            <FlashCardButtons nextCard={nextCard} />
        </div>
    );
}
