'use client'

import { Button, Stack, Flex, List, ListItem } from '@chakra-ui/react'
import { useState, MouseEvent, useRef } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { setCards } from '../store/cardsSlice';
import FlashCard from '../common/FlashCard'

interface Props {
    selectedCard: FlashCard | null
    createCard: () => any
    deleteCard: (id: string) => any
    selectCard: (card: FlashCard | null) => any
}

export function CardList(props: Props) {
    const dispatch = useAppDispatch();
    const cardsList = useAppSelector(state => state.cards.cardsList);
    const [cardError, setCardError] = useState({ error: '' })
    const selectedRef = useRef<HTMLLIElement | null>(null);

    const createCardHandler = async () => {
        try {
            let createdCard = await props.createCard()
            dispatch(setCards([...cardsList, createdCard]))
            setCardError({ error: '' })
            props.selectCard(createdCard)
            selectedRef.current?.scrollIntoView();
        } catch (e) {
            console.error(e)
            setCardError({ error: 'Error creating card' })
        }
    }

    const deleteCardHandler = async (e: any) => {
        try {
            if (props.selectedCard) {
                let cardID = props.selectedCard?.id
                await props.deleteCard(cardID)
                let updatedCardsList = [...cardsList]
                updatedCardsList.splice(
                    cardsList.findIndex((card: FlashCard) => card.id === cardID),
                    1
                )
                dispatch(setCards(updatedCardsList))
                props.selectCard(null)
                setCardError({ error: '' })
            }
        } catch (e) {
            console.error(e)
            setCardError({ error: 'Error deleting card' })
        }
    }

    const selectCardHandler = (e: any) => {
        let cardID = e.target.id
        let pickedCard = cardsList[cardsList.findIndex((card: FlashCard) => card.id === cardID)]
        props.selectCard(pickedCard)
    }

    const cardItemCSS = 'p-3 cursor-pointer'

    return (
        <Stack className="p-6" spacing={6}>
            <List id='flashcards-list' className="w-64 overflow-y-scroll h-72 mb-5 rounded-md">
                {cardsList.map((card: FlashCard) => (
                    <ListItem
                        key={card.id}
                        id={card.id}
                        onClick={selectCardHandler}
                        className={
                            props.selectedCard?.id === card.id
                                ? `${cardItemCSS} bg-green-400 text-gray-50`
                                : `${cardItemCSS} hover:bg-green-400 hover:text-gray-50`
                        }
                        ref={props.selectedCard?.id === card.id ? selectedRef : null}
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
