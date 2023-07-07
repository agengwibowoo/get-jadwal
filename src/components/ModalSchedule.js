import React, { useEffect, useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { patch, post } from '../helpers/api';
import getEmail from '../helpers/getEmail';
import { days } from '../constant/days';

function ModalSchedule({
  isOpen,
  onClose,
  refetch,
  day,
  title = '',
  type = 'add',
  initialValues,
}) {
  const submitCounter = useRef();

  useEffect(() => {
    if (isOpen) {
      submitCounter.current = 1;
    }
  }, [isOpen]);

  const handleAddSchedule = (values, actions) => {
    const { title, day: day_ } = values;
    const day__ = day || day_;
    post('schedule', { title, day: day__ }, { params: { email: getEmail() } })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        actions.setSubmitting(false);
        onClose();
        refetch();
      });
  };

  const handlEditSchedule = (values, actions) => {
    const { title } = values;
    patch(
      'schedule',
      { title },
      { params: { email: getEmail(), id: initialValues?.id } }
    )
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        actions.setSubmitting(false);
        onClose();
        refetch();
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        data-cy={type === 'add' && !day ? 'form-add' : 'detail-form'}
      >
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton data-cy="close-modal" />
        <ModalBody>
          <VStack>
            <Formik
              initialValues={{ title: '', day: 'tuesday', ...initialValues }}
              onSubmit={(values, actions) => {
                submitCounter.current = submitCounter.current + 1;
                if (submitCounter.current <= 2) {
                  if (type === 'add') {
                    handleAddSchedule(values, actions);
                  } else {
                    handlEditSchedule(values, actions);
                  }
                }
              }}
            >
              {props => (
                <Form>
                  <Field name="title">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.title && form.touched.title}
                      >
                        <FormLabel>Mata Kuliah</FormLabel>
                        <Input
                          type="text"
                          {...field}
                          placeholder="Masukkan Mata Kuliah"
                          data-cy="form-matkul"
                        />
                        <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  {!day ? (
                    <Field name="day">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.day && form.touched.day}
                        >
                          <FormLabel data-cy="form-day">Pilih Hari</FormLabel>
                          <Select {...field}>
                            {days.map(item => (
                              <option key={item.value} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>{form.errors.day}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  ) : (
                    <></>
                  )}
                  <ModalFooter>
                    <Button
                      colorScheme="pink"
                      isLoading={props.isSubmitting}
                      type="submit"
                      width="100%"
                      borderRadius="47px"
                      data-cy="btn-submit"
                      isDisabled={
                        !day
                          ? !props.values.title ||
                            !props.values.day ||
                            props.isSubmitting
                          : !props.values.title || props.isSubmitting
                      }
                    >
                      Simpan
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalSchedule;
