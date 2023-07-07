import React from 'react';
import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Spacer,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import getEmail from '../helpers/getEmail';
import isLoggedIn from '../helpers/isLoggedIn';

const AppTitle = () => <Heading size="lg">GetJadwal</Heading>;

function Header() {
  const navigate = useNavigate();
  const isLoggedIn_ = isLoggedIn();
  return (
    <Container maxW="100%" bg="purple.800" color="white" padding="32px">
      <Flex maxW="1000px" alignItems="center" gap="2" margin="0 auto">
        {isLoggedIn_ ? (
          <AppTitle />
        ) : (
          <Center w="100%">
            <AppTitle />
          </Center>
        )}
        {isLoggedIn_ ? (
          <>
            <Spacer />
            <Button
              onClick={() => {
                localStorage.removeItem('email');
                navigate('/');
              }}
              bgColor="#D9019C"
              color="white"
              padding="8px 16px"
              borderRadius="12px"
              _hover={{
                color: 'white',
              }}
              data-cy="btn-logout"
            >{`Check out | ${getEmail()}`}</Button>
          </>
        ) : (
          <></>
        )}
      </Flex>
    </Container>
  );
}

export default Header;
