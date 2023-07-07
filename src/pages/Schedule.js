import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import Container from '../components/Container';
import Subject from '../components/Subject';
import { useNavigate, useParams } from 'react-router-dom';
import { get } from '../helpers/api';
import getEmail from '../helpers/getEmail';
import ModalSchedule from '../components/ModalSchedule';
import { days } from '../constant/days';
import ModalDeleteSchedule from '../components/ModalDeleteSchedule';
import emptyState from '../assets/todo-empty-state.png';

function Schedule() {
  const [isModalScheduleOpen, setIsModalScheduleOpen] = useState(false);
  const [modalType, setModalType] = useState();
  const [initialValues, setInitialValues] = useState({});
  const [detail, setDetail] = useState();
  const { day } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (day) {
      getDetailSchedule();
    }
  }, [day]);

  const getDetailSchedule = () => {
    get('schedule', { params: { email: getEmail(), day } })
      .then(({ data }) => {
        setDetail(data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleOpenModal = (type = 'add', data) => {
    setModalType(type);
    if (type === 'edit' || type === 'delete') {
      setInitialValues(data);
    } else {
      setInitialValues({});
    }
    setIsModalScheduleOpen(true);
  };

  return (
    <Container>
      <ModalSchedule
        isOpen={isModalScheduleOpen && modalType !== 'delete'}
        onClose={() => setIsModalScheduleOpen(false)}
        refetch={getDetailSchedule}
        day={day}
        type={modalType}
        title={`${modalType === 'edit' ? 'Edit' : 'Tambah'} Mata Kuliah`}
        initialValues={initialValues}
      />
      <ModalDeleteSchedule
        isOpen={isModalScheduleOpen && modalType === 'delete'}
        onClose={() => setIsModalScheduleOpen(false)}
        refetch={getDetailSchedule}
        id={initialValues.id}
      />
      <Flex
        width="1000px"
        alignItems="center"
        justify="space-between"
        gap="2"
        margin="0 auto"
        borderBottom="1px solid #BBB"
        paddingBottom="29px"
      >
        <Box display="flex" alignItems="center">
          <IconButton
            aria-label="back"
            data-cy="btn-back"
            background="none"
            icon={<ChevronLeftIcon w={12} h={12} />}
            onClick={() => navigate('/home')}
          />
          <Heading size="lg" data-cy="detail-title">
            {days?.filter(item => item.value === day)?.[0]?.label}
          </Heading>
        </Box>
        <Button
          borderRadius="45px"
          colorScheme="pink"
          leftIcon="+"
          onClick={() => handleOpenModal('add')}
          data-cy="btn-create-schedule"
        >
          Tambah Mata Kuliah
        </Button>
      </Flex>
      <Box width="1000px">
        {detail?.length ? (
          detail?.map(item => (
            <Subject data={item} handleOpenModal={handleOpenModal} />
          ))
        ) : (
          <Center>
            <Image
              data-cy="todo-empty-state"
              src={emptyState}
              alt="todo-empty-state"
            />
          </Center>
        )}
      </Box>
    </Container>
  );
}

export default Schedule;
