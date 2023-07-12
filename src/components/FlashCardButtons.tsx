'use client'
import { Button, ButtonGroup } from '@chakra-ui/react'

export function FlashCardButtons() {
    return (
        <ButtonGroup className='flex justify-between'>
            <Button className='bg-green-400' colorScheme='green'>Flip Card</Button>
            <Button className='bg-green-400' colorScheme='green'>Mark Learned</Button>
            <Button className='bg-green-400' colorScheme='green'>Next Card</Button>
        </ButtonGroup>
    )
}
