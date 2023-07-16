'use client'

import { Flex, Input, Stack, HStack, Button, Text, Textarea } from '@chakra-ui/react'

export function CardData(props: any) {
    return (
        <Stack className="flex grow p-6" spacing={6}>
            <Stack>
                <Text>Question</Text>
                <Input />
            </Stack>

            <Stack>
                <Text>Answer</Text>
                <Textarea />
            </Stack>

            <HStack>
                <Button>Save Changes</Button>
                <Button>Mark Learned</Button>
            </HStack>
        </Stack>
    );
}
