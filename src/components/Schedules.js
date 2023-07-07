import React from 'react';
import { Box, Card, CardBody } from '@chakra-ui/react';

function Schedules({ detail }) {
  return (
    <Card boxShadow="0px 6px 10px 0px rgba(0, 0, 0, 0.10)" borderRadius="12px">
      <CardBody>
        {detail?.map((item, idx) => (
          <Box
            key={item.id}
            background="#f8f8f8"
            borderRadius="12px"
            padding="16px"
            marginBottom={idx === detail?.length - 1 ? 0 : '8px'}
          >
            {item.title}
          </Box>
        ))}
      </CardBody>
    </Card>
  );
}

export default Schedules;
