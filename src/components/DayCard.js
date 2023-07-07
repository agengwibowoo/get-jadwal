import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Heading, Text } from '@chakra-ui/react';
import Schedules from './Schedules';
import { get } from '../helpers/api';
import getEmail from '../helpers/getEmail';

function DayCard({ label, totalSubject, value }) {
  const [detail, setDetail] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (totalSubject) {
      getDetailSchedule(value);
    }
  }, [totalSubject, value]);

  const getDetailSchedule = day => {
    get('schedule', { params: { email: getEmail(), day } })
      .then(({ data }) => {
        setDetail(data.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <>
      <Card
        boxShadow="0px 6px 10px 0px rgba(0, 0, 0, 0.10)"
        borderRadius="12px"
        marginBottom="24px"
        onClick={() => navigate(`/schedule/${value}`)}
        data-cy="card-day"
        _hover={{
          cursor: 'pointer',
        }}
      >
        <CardBody data-cy={`card-title-${label}`}>
          <Heading size="md">{label}</Heading>
          {totalSubject ? (
            <Text
              data-cy={`card-desc-${label}`}
            >{`${totalSubject} Mata Kuliah`}</Text>
          ) : (
            <Text data-cy={`card-desc-${label}`}>Belum ada mata kuliah</Text>
          )}
        </CardBody>
      </Card>
      {detail?.length ? <Schedules detail={detail} /> : <></>}
    </>
  );
}

export default DayCard;
