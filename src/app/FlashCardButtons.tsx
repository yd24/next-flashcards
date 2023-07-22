'use client'
import { Button, ButtonGroup, useColorModeValue } from '@chakra-ui/react'

export function FlashCardButtons() {
    return (
        <ButtonGroup className='flex justify-between'>
            <Button color={'white'} bg='green.400' _hover={ {bg: 'green.200'} }>Mark Learned</Button>
            <Button color={'white'} bg='green.400' _hover={ {bg: 'green.200'} }>Next Card</Button>
        </ButtonGroup>
    )
}
