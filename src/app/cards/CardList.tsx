'use client';

import { Button, Stack, Flex, List, ListItem } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export function CardList(props: any) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(props.cards);
  }, []);

  return (
    <Stack className='p-6' spacing={6}>
      <List className='p-4' spacing={3}>
        {
          cards.map(card => (
            <ListItem key={card.id}>
              {card.question}
            </ListItem>
          ));
        }
      </List>
      <Flex justify='space-between'>
        <Button
        >
          Add Card
        </Button>
        <Button
          onClick={props.deleteCard}
        >
          Delete Card
        </Button>
      </Flex>
    </Stack>
  );
}