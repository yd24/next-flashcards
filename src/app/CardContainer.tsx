'use client'

import { MainFlashCard } from './MainFlashCard';
import { FlashCardButtons } from './FlashCardButtons';
import { useAppDispatch } from './hooks';
import { setCards } from './store/cardsSlice'
import FlashCard from './common/FlashCard';

interface Props {
  cards: FlashCard[]
}

export function CardContainer(props: Props) {
    const dispatch = useAppDispatch();
    dispatch(setCards(props.cards));

    return (
      <div
        className='flex flex-col justify-center items-center grow bg-gray-50 gap-6'
      >
        <MainFlashCard />
        <FlashCardButtons />
      </div>
    );
}
