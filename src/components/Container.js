import React from 'react';
import { VStack } from '@chakra-ui/react';
import Header from './Header';

function Container({ children }) {
  return (
    <VStack>
      <Header />
      {children}
    </VStack>
  );
}

export default Container;
