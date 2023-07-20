'use client'

import { Flex, Input, Stack, HStack, Button, Checkbox, Text, Textarea } from '@chakra-ui/react'

export function CardData(props: any) {
    return (
        <Stack className="w-96 p-6 grow" spacing={6}>
            <Stack>
                <Text>Question</Text>
                <Input />
            </Stack>

            <Stack>
                <Text>Answer</Text>
                <Textarea resize="vertical"/>
            </Stack>

            <HStack className="mt-5" justify='space-between'>
                <HStack spacing={5}>
                  <Checkbox>Learned</Checkbox>
                  <Checkbox>Format as Code</Checkbox>
                </HStack>
                <div>
                  <Button>Save Changes</Button>
                </div>
            </HStack>
        </Stack>
    );
}
