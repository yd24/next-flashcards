'use client';

import { Button, Stack, Flex, List, ListItem } from '@chakra-ui/react';
import { useState } from 'react';

type Card = {
  id: string,
  question: string,
  answer: string,
  learned: boolean,
};

type Props = {
  cards: {
    id: string,
    question: string,
    answer: string,
    learned: boolean,
  }[],
  createCard: () => any,
};

export function CardList(props: Props) {
  const [cardsList, setCardsList] = useState(props.cards);
  const [selectedCard, setSelectedCard] = useState('');

  const createCardHandler = async() => {
    let createdCard = await props.createCard();
    setCardsList([...cardsList, createdCard]);
  };

  const selectCardHandler = (e) => {
    console.log(e.target.id);
    setSelectedCard(e.target.id);
  };

  const cardItemCSS = 'p-3 cursor-pointer';

  return (
    <Stack className='p-6' spacing={6}>
      <List className='p-4'>
        {
          cardsList.map(card => (
            <ListItem 
              key={card.id}
              id={card.id}
              onClick={selectCardHandler}
              className={selectedCard === card.id ? `${cardItemCSS} bg-green-400` : `${cardItemCSS} hover:bg-green-400`}
            >
              {card.question}
            </ListItem>
          ))
        }
      </List>
      <Flex justify='space-between'>
        <Button
          onClick={createCardHandler}
        >
          Add Card
        </Button>
        <Button>
          Delete Card
        </Button>
      </Flex>
    </Stack>
  );
}