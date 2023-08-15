'use client';

import { MainFlashCard } from './MainFlashCard';
import { FlashCardButtons } from './FlashCardButtons';
import { useState, useEffect, forwardRef } from 'react';
import { Box } from '@chakra-ui/react';
import { useAppDispatch } from './hooks';
import { setCards } from './store/cardsSlice';
import type { FlashCardResult, FlashCardsResult } from '../utils/cards';
import { getRandom } from '../utils/random';
import { motion, useAnimationControls, useAnimate } from 'framer-motion';

export function CardContainer({ cards, markLearned }: { cards: FlashCardsResult; markLearned: (cardID: string) => void; }) {
    /*const dispatch = useAppDispatch();
    dispatch(setCards(props.cards));*/

    let [currentCard, setCurrentCard] = useState<FlashCardResult | null>(null);
    let animControls = useAnimationControls();
    const [scope, animate] = useAnimate();
    const [rotation, setRotation] = useState(360);

    const animateFlip = () => {
        let newRotation = rotation;
        if (newRotation < 360) {
          setRotation(360);
          newRotation = 360;
        } else {
          setRotation(180);
          newRotation = 180;
        }
        animate([['.card-inner', { rotateY: newRotation }, { duration: 1.2 }]]);
    };

    const nextCard = () => {
      animControls.start({x: "-200%", transition: {duration: 0.5}}).then(() => {
        animControls.set({x: "200%"});
        let prevCard = cards.shift()!;
        cards.push(prevCard);
        setCurrentCard(cards[0]);
        animate([['.card-inner', {rotateY: 0}, { duration: 0}]]).complete();
        setRotation(360);
        animControls.start({x: 0, transition: {duration: 0.5}});
      });
    };

    const removeLearned = async(cardID: string) => {
      let index = cards.findIndex((card) => card.id === cardID);
      cards.splice(index, 1);
    };

    useEffect(() => {
      setCurrentCard(cards[0]);
    }, []);

    return (
        <div className="overflow-hidden flex flex-col justify-center items-center grow bg-gray-50 gap-6">
            <motion.div animate={animControls} ref={scope}>
              <MainFlashCard
                  currentCard={currentCard}
                  animateFlip={animateFlip}
              />
            </motion.div>
            <FlashCardButtons currentCard={currentCard} nextCard={nextCard} markLearned={markLearned} removeLearned={removeLearned}/>
        </div>
    );
}
