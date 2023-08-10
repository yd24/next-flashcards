'use client';

import { MainFlashCard } from './MainFlashCard';
import { FlashCardButtons } from './FlashCardButtons';
import { useState, useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { setCards } from './store/cardsSlice';
import type { FlashCardResult, FlashCardsResult } from '../utils/cards';
import { getRandom } from '../utils/random';
import { useAnimate } from 'framer-motion';

export function CardContainer({ cards, markLearned }: { cards: FlashCardsResult; markLearned: (cardID: string) => void; }) {
    /*const dispatch = useAppDispatch();
    dispatch(setCards(props.cards));*/

    let [currentCard, setCurrentCard] = useState<FlashCardResult | null>(null);
    let [flipped, setFlipped] = useState(false);
    let [scope, animate] = useAnimate();

    const nextCard = () => {
        let card = cards.shift()!;
        setCurrentCard(card);
        setFlipped(false);
        cards.push(card);
    };

    const animateCardExit = () => {
      animate([['.card', { x: -1000 }, { ease: 'easeIn', duration: 0.5}]]);
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
        <div className="flex flex-col justify-center items-center grow bg-gray-50 gap-6" ref={scope}>
            <MainFlashCard
                cards={cards}
                currentCard={currentCard}
                flipped={flipped}
                flipCard={flipCard}
            />
            <FlashCardButtons animateCardExit={animateCardExit} currentCard={currentCard} nextCard={nextCard} markLearned={markLearned} removeLearned={removeLearned}/>
        </div>
    );
}
