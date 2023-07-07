import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { post } from '../helpers/api';
import Container from '../components/Container';
import isLoggedIn from '../helpers/isLoggedIn';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Format email tidak sesuai')
    .test('valid-domain', 'Format email tidak sesuai', value => {
      if (typeof value === 'string') {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      }
      return false;
    })
    .required('Email is required'),
});

function CheckIn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate('/home');
    }
  }, [isLoggedIn()]);
  return (
    <Container>
      <Center>
        <Box
          maxW="sm"
          boxShadow="0px 6px 10px 0px rgba(0, 0, 0, 0.10)"
          borderRadius="12px"
          padding="48px 65px"
        >
          <VStack>
            <Heading size="md" marginBottom="53px" data-cy="text-login">
              Check In
            </Heading>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                const { email } = values;
                post('checkin', { email })
                  .then(({ data }) => {
                    localStorage.setItem('email', data.data.email);
                    navigate('home');
                  })
                  .catch(error => {
                    console.error(error);
                  })
                  .finally(() => {
                    actions.setSubmitting(false);
                  });
              }}
            >
              {props => (
                <Form>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel>Email</FormLabel>
                        <Input
                          type="email"
                          {...field}
                          placeholder="Masukkan email anda"
                          data-cy="input-email"
                        />
                        <FormErrorMessage data-cy="error-email">
                          {form.errors.email}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={4}
                    colorScheme="pink"
                    isLoading={props.isSubmitting}
                    type="submit"
                    width="100%"
                    borderRadius="47px"
                    isDisabled={!props.values.email}
                    data-cy="btn-login"
                  >
                    Mulai sesi
                  </Button>
                </Form>
              )}
            </Formik>
          </VStack>
        </Box>
      </Center>
    </Container>
  );
}

export default CheckIn;
