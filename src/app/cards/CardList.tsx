'use client'

import { Button, Stack, Flex, List, ListItem } from '@chakra-ui/react'
import { useState, MouseEvent } from 'react'

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

export function CardList(props: Props) {
    const [cardsList, setCardsList] = useState(props.cards)
    const [selectedCardID, setSelectedCardID] = useState('')
    const [cardError, setCardError] = useState({ error: '' })

    const createCardHandler = async () => {
        try {
            let createdCard = await props.createCard()
            setCardsList([...cardsList, createdCard])
            setCardError({ error: '' })
        } catch (e) {
            console.error(e)
            setCardError({ error: 'Error creating card' })
        }
    }

    const deleteCardHandler = async (e: any) => {
        try {
            await props.deleteCard(selectedCardID)
            let updatedCardsList = [...cardsList]
            updatedCardsList.splice(
                cardsList.findIndex((card) => card.id === selectedCardID),
                1
            )
            setCardsList(updatedCardsList)
            setSelectedCardID('')
            setCardError({ error: '' })
        } catch (e) {
            console.error(e)
            setCardError({ error: 'Error deleting card' })
        }
    }

    const selectCardHandler = (e: any) => {
        setSelectedCardID(e.target.id)
    }

    const cardItemCSS = 'p-3 cursor-pointer'

    return (
        <Stack className="p-6" spacing={6}>
            <List className="p-4">
                {cardsList.map((card) => (
                    <ListItem
                        key={card.id}
                        id={card.id}
                        onClick={selectCardHandler}
                        className={
                            selectedCardID === card.id
                                ? `${cardItemCSS} bg-green-400`
                                : `${cardItemCSS} hover:bg-green-400`
                        }
                    >
                        {card.question}
                    </ListItem>
                ))}
            </List>
            <Flex justify="space-between">
                <Button onClick={createCardHandler}>Add Card</Button>
                <Button onClick={deleteCardHandler}>Delete Card</Button>
            </Flex>
            {cardError.error.length > 0 && <p className="text-red-700">{cardError.error}</p>}
        </Stack>
    )
}
