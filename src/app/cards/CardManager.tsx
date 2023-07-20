import { CardList } from './CardList'
import { CardData } from './CardData'
import { useState } from 'react'

type Card = {
    id: string
    question: string
    answer: string
    learned: boolean
}

type Props = {
    cards: {
        id: string
        question: string
        answer: string
        learned: boolean
    }[]
    createCard: () => any
    deleteCard: (id: string) => any
}

export function CardManager(props: Props) {
    const [selectedCard, setSelectedCard] = useState<Card | null>(null)

    const selectCard = (card: Card | null) => {
        setSelectedCard(card)
    }

    return (
        <div className="flex justify-flex-start items-flex-start px-12 gap-20">
            <CardList
                cards={props.cards}
                createCard={props.createCard}
                deleteCard={props.deleteCard}
                selectCard={selectCard}
                selectedCard={selectedCard}
            />
            <CardData />
        </div>
    )
}
