'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/provider'
import { Provider } from 'react-redux';
import store from './store';

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <Provider store={store}>
          {children}
        </Provider>
      </ChakraProvider>
    </CacheProvider>
  )
}