'use client';

import { useState } from 'react';
import { Card } from '@chakra-ui/react';

export function FlashCard() {
  let [flipped, setFlipped] = useState(false);
  const clickCard = () => setFlipped(!flipped);

  return (
    <>
        <Card
          minW={[200, 300, 600]}
          minH={[300, 400, 400]}
          align='center'
          justify='center'
          onClick={clickCard}
        >
          <p>{!flipped ? `What is the meaning of life?` : `Me wombo, she wombo.`}</p>
        </Card>
    </>
  )
}
