import React, { useState, useEffect } from 'react';
import { Container, Content } from './styles';
import Header from '../../components/Header';
import api from '../../services/api';

interface Checkin {
  id: number;
  companion_name: null | string;
  person_name: string;
  formatted_created_at: string;
  active: boolean;
}

const CheckIn: React.FC = () => {
  const [checkins, setCheckins] = useState<Checkin[]>([]);

  useEffect(() => {
    async function loadCheckins(): Promise<void> {
      try {
        const response = await api.get('api/v1/checkins/?limit=20');
        setCheckins(response.data.results);
      } catch (err) {
        console.log(err);
      }
    }
    loadCheckins();
  }, []);

  const handleCheckinClick = ({ id, active }: Checkin): void => {
    async function changeActive(): Promise<void> {
      try {
        await api.patch(`api/v1/checkins/${id}/`, {
          reason: 'professional',
          active: !active,
        });

        const actualCheckins = [...checkins];

        const index = actualCheckins.findIndex(checkin => checkin.id === id);
        actualCheckins[index].active = !active;

        setCheckins(actualCheckins);
      } catch (err) {
        console.log(err);
      }
    }
    changeActive();
  };

  return (
    <Container>
      <Header />
      <Content>
        {checkins.map(checkin => (
          <div
            key={checkin.id}
            onClick={() => handleCheckinClick(checkin)}
            style={
              checkin.active
                ? { backgroundColor: '#335522', color: 'white' }
                : { backgroundColor: '#3b070e', color: 'white' }
            }
          >
            <h3>{checkin.person_name}</h3>
            <p>{checkin.companion_name}</p>
            <p>{checkin.formatted_created_at}</p>
          </div>
        ))}
      </Content>
    </Container>
  );
};

export default CheckIn;
