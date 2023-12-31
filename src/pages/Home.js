import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, GridItem } from '@chakra-ui/react';
import Container from '../components/Container';
import DayCard from '../components/DayCard';
import { get } from '../helpers/api';
import getEmail from '../helpers/getEmail';
import ModalSchedule from '../components/ModalSchedule';
import { days } from '../constant/days';
import isLoggedIn from '../helpers/isLoggedIn';

function JadwalKuliah() {
  const [subjectsCounter, setSubjectsCounter] = useState();
  const [isModalAddScheduleOpen, setIsModalAddScheduleOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/');
    } else {
      getSchedule();
    }
  }, []);

  const getSchedule = () => {
    get('schedule', { params: { email: getEmail() } })
      .then(({ data }) => {
        setSubjectsCounter(data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Container>
      <ModalSchedule
        isOpen={isModalAddScheduleOpen}
        onClose={() => setIsModalAddScheduleOpen(false)}
        refetch={getSchedule}
        title="Buat Jadwal Kuliah"
      />
      <Box width="1000px" textAlign="end">
        <Button
          borderRadius="45px"
          colorScheme="pink"
          leftIcon="+"
          onClick={() => setIsModalAddScheduleOpen(true)}
          data-cy="btn-create-schedule"
        >
          Buat Jadwal Kuliah
        </Button>
      </Box>
      <Box width="1000px">
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {days?.map(item => (
            <GridItem key={item?.value} w="100%" h="10">
              <DayCard
                label={item.label}
                value={item.value}
                totalSubject={subjectsCounter?.[item.value]}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default JadwalKuliah;
