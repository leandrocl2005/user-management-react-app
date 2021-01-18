import React, { useState, useEffect, FormEvent } from 'react';
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
import SearchForm from '../../../components/SearchForm';
import Nav from '../../../components/Nav';
import GalleryContainer from '../../../components/GalleryContainer';
import Avatar from '../../../components/Avatar';

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

  const handleCheckinClick = ({ id, active }: CheckinListData): void => {
    async function changeActive(): Promise<void> {
      try {
        await api.patch(`api/v1/checkins/${id}/`, {
          active: !active,
        });

        const actualCheckins = [...checkins];

        const index = actualCheckins.findIndex(checkin => checkin.id === id);
        actualCheckins[index].active = !active;

        setCheckins(actualCheckins);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Servidor offline. Tente mais tarde!',
        });
      }
    }
    changeActive();
    setTotalCheckins(totalCheckins - 1);
  };

  const handleSearchSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setSearchSubmit(searchInput);
  };

  return (
    <Container>
      <Header />
      <Nav total={totalCheckins} pathCreate={'/create-checkin'}>
        <SearchForm onSubmit={handleSearchSubmit}>
          <input
            placeholder="Buscar por nome"
            name="filter"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
          />
        </SearchForm>
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
                  onClick={() => handleCheckinClick(checkin)}
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
