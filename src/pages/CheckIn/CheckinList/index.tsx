import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { TiLockOpen, TiLockClosed, TiEye } from 'react-icons/ti';

import {
  Container,
  CheckinItem,
  CardBody,
  Actions,
  AvatarBodyContainer,
} from './styles';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import Header from '../../../components/Header';
import FilterButton from '../../../components/FilterButton';
import Nav from '../../../components/Nav';
import GalleryContainer from '../../../components/GalleryContainer';
import Avatar from '../../../components/Avatar';
import StaticSearchForm from '../../../components/StaticSearchForm';

import { CheckinListData } from '../types';

const CheckInList: React.FC = () => {
  const { addToast } = useToast();

  const [checkins, setCheckins] = useState<CheckinListData[]>([]);

  const [searchInput, setSearchInput] = useState('');
  const [searchSubmit, setSearchSubmit] = useState('');
  const [totalCheckins, setTotalCheckins] = useState(0);
  const [filterActive, setFilterActive] = useState<string | null>(null);

  useEffect(() => {
    async function loadCheckins(): Promise<void> {
      try {
        let url = 'api/v1/checkins/?';
        url += 'limit=12';
        url += `&search=${searchSubmit}`;
        if (filterActive) {
          url += `&active=${filterActive}`;
        }
        const response = await api.get(url);
        setCheckins(response.data.results);
        setTotalCheckins(response.data.count);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Servidor offline. Tente mais tarde!',
        });
      }
    }
    loadCheckins();
  }, [addToast, searchSubmit, filterActive]);

  async function handleCloseCheckin(checkin: CheckinListData): Promise<void> {
    let data: {
      person: number;
      reason: string;
      active: boolean;
      companion?: number;
    } = {
      person: checkin.person,
      reason: checkin.reason,
      active: false,
    };

    if (checkin.companion) {
      data = {
        ...data,
        companion: checkin.companion,
      };
    }

    try {
      await api.put(`api/v1/checkins/${checkin.id}/`, data);
      const actualCheckins = [...checkins];
      const index = actualCheckins.findIndex(
        actualCheckin => actualCheckin.id === checkin.id,
      );
      actualCheckins[index].active = false;
      setCheckins(actualCheckins);
      addToast({
        type: 'success',
        title: 'Checkout com sucesso',
        description: 'Seu checkout foi realizado com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no servidor',
        description: 'Servidor offline. Tente mais tarde!',
      });
    }
  }

  const handleSearchSubmit = (): void => {
    setSearchSubmit(searchInput);
  };

  return (
    <Container>
      <Header />

      <Nav total={totalCheckins} pathCreate={'/create-checkin'}>
        <StaticSearchForm
          onClickSearch={handleSearchSubmit}
          placeholder={'Buscar por nome'}
          name={'filter'}
          value={searchInput}
          onChange={event => setSearchInput(event.target.value)}
        />
        <FilterButton
          color={'#84c4b7'}
          text={'Abertos'}
          onClick={() => setFilterActive('true')}
        />
        <FilterButton
          color={'#414941'}
          onClick={() => setFilterActive('false')}
          text={'Fechados'}
        />
        <FilterButton
          color={'#c68a12'}
          text={'Todos'}
          onClick={() => setFilterActive(null)}
        />
      </Nav>

      <GalleryContainer>
        {checkins.map(checkin => (
          <CheckinItem key={checkin.id}>
            <AvatarBodyContainer>
              <Avatar src={''} alt={''} />
              <CardBody>
                <h3>{checkin.person_name}</h3>
                <p>{checkin.companion_name}</p>
                <p>{checkin.formatted_created_at}</p>
              </CardBody>
            </AvatarBodyContainer>
            <Actions
              style={{
                backgroundColor: checkin.active ? '#84c4b7' : '#414941',
              }}
            >
              {checkin.active && (
                <TiLockOpen
                  size={24}
                  onClick={() => handleCloseCheckin(checkin)}
                  style={{ cursor: 'pointer' }}
                  color={'#fffffe'}
                />
              )}
              {!checkin.active && <TiLockClosed size={24} color={'#fffffe'} />}
              <Link to={`/checkins/${checkin.id}/`}>
                <TiEye
                  size={24}
                  style={{ cursor: 'pointer' }}
                  color={'#fffffe'}
                />
              </Link>
            </Actions>
          </CheckinItem>
        ))}
      </GalleryContainer>
    </Container>
  );
};

export default CheckInList;
