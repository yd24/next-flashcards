'use client'

import {
    Avatar,
    Box,
    Center,
    Flex,
    Text,
    Button,
    Stack,
    Menu,
    MenuList,
    MenuItem,
    MenuButton,
    MenuDivider,
    useColorModeValue,
} from '@chakra-ui/react'

export function Header() {
    return (
        <Box>
            <Flex
                bg={useColorModeValue('white', 'gray.800')}
                color={useColorModeValue('gray.600', 'white')}
                minH={'60px'}
                py={{ base: 6 }}
                px={{ base: 6 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('gray.200', 'gray.900')}
                align={'center'}
                justify={'space-between'}
            >
                <Flex justify={'flex-start'}>
                    <Text fontFamily={'heading'} color={useColorModeValue('gray.800', 'white')}>
                        Simple Flashcards
                    </Text>
                </Flex>

                <Stack justify={'flex-end'} spacing={12} direction={'row'}>
                    <Button
                        as={'a'}
                        fontSize={'sm'}
                        fontWeight={400}
                        variant={'link'}
                        href={'./cards'}
                    >
                        Manage Cards
                    </Button>
                    <Menu>
                        <MenuButton
                            as={Button}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}
                            minW={0}
                        >
                            <Avatar
                                size={'sm'}
                                src={'https://avatars.dicebear.com/api/male/username.svg'}
                            />
                        </MenuButton>
                        <MenuList alignItems={'center'}>
                            <br />
                            <Center>
                                <Avatar
                                    size={'2xl'}
                                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                                />
                            </Center>
                            <br />
                            <Center>
                                <p>Username</p>
                            </Center>
                            <br />
                            <MenuDivider />
                            <MenuItem>Your Servers</MenuItem>
                            <MenuItem>Account Settings</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Stack>
            </Flex>
        </Box>
    )
}
