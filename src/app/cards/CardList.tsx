'use client'

import { Button, Stack, Flex, List, ListItem } from '@chakra-ui/react'
import { useState, MouseEvent } from 'react'

type Card = {
    id: string,
    question: string,
    answer: string,
    learned: boolean,
}

type Props = {
    cards: {
        id: string
        question: string
        answer: string
        learned: boolean
    }[],
    selectedCard: Card | null,
    createCard: () => any,
    deleteCard: (id: string) => any,
    selectCard: (card: Card | null) => any,
}

export function CardList(props: Props) {
    const [cardsList, setCardsList] = useState(props.cards);
    const [cardError, setCardError] = useState({ error: '' });

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
          if (props.selectedCard) {
            let cardID = props.selectedCard?.id;
            await props.deleteCard(cardID)
            let updatedCardsList = [...cardsList]
            updatedCardsList.splice(
                cardsList.findIndex((card) => card.id === cardID),
                1
            )
            setCardsList(updatedCardsList)
            props.selectCard(null)
            setCardError({ error: '' })
          }
        } catch (e) {
            console.error(e)
            setCardError({ error: 'Error deleting card' })
        }
    }

    const selectCardHandler = (e: any) => {
        let cardID = e.target.id;
        let pickedCard = cardsList[cardsList.findIndex((card) => card.id === cardID)];
        props.selectCard(pickedCard);
    }

    const cardItemCSS = 'p-3 cursor-pointer'

    return (
        <Stack className="p-6" spacing={6}>
            <List className="w-64 overflow-y-scroll h-72 mb-5 rounded-md">
                {cardsList.map((card) => (
                    <ListItem
                        key={card.id}
                        id={card.id}
                        onClick={selectCardHandler}
                        className={
                            props.selectedCard?.id === card.id
                                ? `${cardItemCSS} bg-green-400 text-gray-50`
                                : `${cardItemCSS} hover:bg-green-400 hover:text-gray-50`
                        }
                    >
                        {card.question}
                    </ListItem>
                ))}
            </List>
            <Flex justify="flex-start" gap={3}>
                <Button onClick={createCardHandler}>Add Card</Button>
                <Button onClick={deleteCardHandler}>Delete Card</Button>
            </Flex>
            {cardError.error.length > 0 && <p className="text-red-700">{cardError.error}</p>}
        </Stack>
    )
}
