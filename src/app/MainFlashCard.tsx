'use client';

import { useState, useEffect } from 'react';
import { Card, Spinner } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from './hooks';
import FlashCard from './common/FlashCard';

export function MainFlashCard() {
  let [currentCard, setCurrentCard] = useState<FlashCard | null>(null);
  let [flipped, setFlipped] = useState(false);
  let cards: FlashCard[] = useAppSelector(state => state.cards.cardsList);
  
  const clickCard = () => setFlipped(!flipped);
  const getRandom = (max: number): number => {
    max = Math.floor(max);
    return Math.floor(Math.random() * (max + 1));
  }

  useEffect(() => {
    let random = getRandom(cards.length - 1);
    let initCard: FlashCard = cards[random];
    setCurrentCard(initCard);
  }, []);

  return (
    <>
        <Card
          minW={[200, 300, 600]}
          minH={[300, 400, 400]}
          align='center'
          justify='center'
          onClick={clickCard}
        >
          {currentCard
          ?
            <p>{!flipped ? `${currentCard?.question}` : `${currentCard?.answer}`}</p>
          :
            <Spinner />
          }
        </Card>
    </>
  )
}
