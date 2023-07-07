import React from 'react';
import { Box, Card, CardBody, Flex, IconButton, Text } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

function Subject({ data, handleOpenModal }) {
  const { title } = data;
  return (
    <>
      <Card
        width="100%"
        boxShadow="0px 6px 10px 0px rgba(0, 0, 0, 0.10)"
        borderRadius="12px"
        marginBottom="24px"
      >
        <CardBody>
          <Flex
            width="100%"
            alignItems="center"
            justify="space-between"
            gap="2"
          >
            <Text data-cy="card-item-title">{title}</Text>
            <Box>
              <IconButton
                aria-label="edit"
                background="none"
                marginRight="2"
                icon={<EditIcon />}
                data-cy="card-item-edit"
                onClick={() => {
                  handleOpenModal('edit', data);
                }}
              />
              <IconButton
                aria-label="delete"
                data-cy="card-item-delete"
                background="none"
                icon={<DeleteIcon />}
                onClick={() => {
                  handleOpenModal('delete', data);
                }}
              />
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}

export default Subject;
