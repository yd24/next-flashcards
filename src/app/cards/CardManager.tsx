'use client'

import { CardList } from './CardList'
import { CardData } from './CardData'
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setCards } from '../store/cardsSlice';
import FlashCard from '../common/FlashCard'

interface Props {
    cards: FlashCard[]
    createCard: () => any
    deleteCard: (id: string) => any
}

export function CardManager(props: Props) {
    const [selectedCard, setSelectedCard] = useState<FlashCard | null>(null)

    //Check for if someone navigates directly to card manager, fetch card data
    const cardsList = useAppSelector(state => state.cards.cardsList);
    if (cardsList.length === 0) {
      const dispatch = useAppDispatch();
      dispatch(setCards(props.cards));
    }

    const selectCard = (card: FlashCard | null) => {
        setSelectedCard(card)
    }

    return (
        <div className="flex justify-flex-start items-flex-start px-12 gap-20">
            <CardList
                createCard={props.createCard}
                deleteCard={props.deleteCard}
                selectCard={selectCard}
                selectedCard={selectedCard}
            />
            <CardData selectedCard={selectedCard}/>
        </div>
    )
}
