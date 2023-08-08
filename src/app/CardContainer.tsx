'use client';

import { MainFlashCard } from './MainFlashCard';
import { FlashCardButtons } from './FlashCardButtons';
import { useState, useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { setCards } from './store/cardsSlice';
import type { FlashCardResult, FlashCardsResult } from '../utils/cards';
import { getRandom } from '../utils/random';

export function CardContainer({ cards, markLearned }: { cards: FlashCardsResult; markLearned: (cardID: string) => void; }) {
    /*const dispatch = useAppDispatch();
    dispatch(setCards(props.cards));*/

    let [currentCard, setCurrentCard] = useState<FlashCardResult | null>(null);
    let [flipped, setFlipped] = useState(false);

    const nextCard = () => {
        let card = cards.shift()!;
        setCurrentCard(card);
        setFlipped(false);
        cards.push(card);
    };

    const flipCard = () => {
        setFlipped(!flipped);
    };

    const removeLearned = async(cardID: string) => {
      let index = cards.findIndex((card) => card.id === cardID);
      cards.splice(index, 1);
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
            <FlashCardButtons currentCard={currentCard} nextCard={nextCard} markLearned={markLearned} removeLearned={removeLearned}/>
        </div>
    );
}
