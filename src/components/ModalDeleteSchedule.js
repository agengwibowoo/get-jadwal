import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  VStack,
  Box,
  Heading,
  Text,
  Center,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { del } from '../helpers/api';
import getEmail from '../helpers/getEmail';

function ModalDeleteSchedule({ isOpen, onClose, refetch, id }) {
  const handlDeleteSchedule = () => {
    del('schedule', { params: { email: getEmail(), id } })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        onClose();
        refetch();
      });
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent data-cy="form-delete">
        <ModalBody>
          <VStack>
            <Box textAlign="center">
              <Center>
                <Box
                  background="#ED4C5C"
                  padding="16px"
                  borderRadius="50%"
                  width="88px"
                  height="88px"
                >
                  <DeleteIcon w={12} h={12} color="white" />
                </Box>
              </Center>
              <Heading size="md">Hapus Mata Kuliah</Heading>
              <Text>Apakah anda yakin menghapus mata kuliah Statistika?</Text>
            </Box>
            <ModalFooter>
              <Button
                colorScheme="gray"
                type="submit"
                width="100%"
                borderRadius="47px"
                marginRight="16px"
                onClick={() => onClose()}
                data-cy="btn-close"
              >
                Batal
              </Button>
              <Button
                colorScheme="red"
                type="submit"
                width="100%"
                borderRadius="47px"
                onClick={() => handlDeleteSchedule()}
                data-cy="btn-submit"
              >
                Hapus
              </Button>
            </ModalFooter>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalDeleteSchedule;
