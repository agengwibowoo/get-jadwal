import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Routing from './Routing';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routing />
    </ChakraProvider>
  );
}

export default App;
