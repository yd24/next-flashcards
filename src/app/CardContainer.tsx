'use client';

import { MainFlashCard } from './MainFlashCard';
import { FlashCardButtons } from './FlashCardButtons';
import { useState, useEffect, forwardRef } from 'react';
import { Box } from '@chakra-ui/react';
import { useAppDispatch } from './hooks';
import { setCards } from './store/cardsSlice';
import type { FlashCardResult, FlashCardsResult } from '../utils/cards';
import { getRandom } from '../utils/random';
import { motion, useAnimationControls } from 'framer-motion';

export function CardContainer({ cards, markLearned }: { cards: FlashCardsResult; markLearned: (cardID: string) => void; }) {
    /*const dispatch = useAppDispatch();
    dispatch(setCards(props.cards));*/

    let [currentCard, setCurrentCard] = useState<FlashCardResult | null>(null);
    let [flipped, setFlipped] = useState(false);
    let animControls = useAnimationControls();

    const nextCard = () => {
        let card = cards.shift()!;
        setCurrentCard(card);
        setFlipped(false);
        cards.push(card);
    };

    const animateNextCard = () => {
      animControls.start({x: -1000, transition: {duration: 0.5}}).then(() => {
        animControls.set({x: 1000});
        animControls.start({x: 0, transition: {duration: 0.5}});
      });
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
        <div className="overflow-hidden flex flex-col justify-center items-center grow bg-gray-50 gap-6">
            <motion.div animate={animControls}>
              <MainFlashCard
                  cards={cards}
                  currentCard={currentCard}
                  flipped={flipped}
                  flipCard={flipCard}
              />
            </motion.div>
            <FlashCardButtons animateCardExit={animateNextCard} currentCard={currentCard} nextCard={nextCard} markLearned={markLearned} removeLearned={removeLearned}/>
        </div>
    );
}
