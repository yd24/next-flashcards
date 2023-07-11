'use client';

import { useState } from 'react';

import { Card } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

export function FlashCard() {
  let [flipped, setFlipped] = useState(false);
  const clickCard = () => setFlipped(!flipped);

  return (
    <>
        <Card
          className='relative z-0'
          as={motion.div}
          minW={[200, 300, 600]}
          minH={[300, 400, 400]}
          align={'center'}
          justify={'center'}
          onClick={clickCard}
          animate={{rotateY: flipped ? 180 : 0, transition: {duration: 0.5}}}
        >
          <p className='relative z-10'>{!flipped ? `What is the meaning of life?` : `Me wombo, she wombo.`}</p>
        </Card>
    </>
  )
}
