'use client'

import { MainFlashCard } from './MainFlashCard';
import { FlashCardButtons } from './FlashCardButtons';
import { useAppDispatch } from './hooks';
import { setCards } from './store/cardsSlice';
import type { FlashCards } from '../utils/cards';

export function CardContainer({cards}: {cards: FlashCards}) {
    /*const dispatch = useAppDispatch();
    dispatch(setCards(props.cards));*/

    return (
      <div
        className='flex flex-col justify-center items-center grow bg-gray-50 gap-6'
      >
        <MainFlashCard cards={cards}/>
        <FlashCardButtons />
      </div>
    );
}
