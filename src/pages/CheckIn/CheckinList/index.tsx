import React, { useState, useEffect, FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
import { TiLockOpen, TiLockClosed, TiEye } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import {
  Container,
  SearchInput,
  CheckinGallery,
  Nav,
  CheckinItem,
  OpenCheckinButton,
  CloseCheckinButton,
  AllCheckinButton,
} from './styles';
import Header from '../../../components/Header';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

interface Checkin {
  id: number;
  companion_name: null | string;
  person_name: string;
  reason: string;
  formatted_created_at: string;
  active: boolean;
}

const CheckInList: React.FC = () => {
  const [checkins, setCheckins] = useState<Checkin[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchSubmit, setSearchSubmit] = useState('');
  const [totalCheckins, setTotalCheckins] = useState(0);
  const [filterActive, setFilterActive] = useState<string | null>(null);
  const { addToast } = useToast();

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

  const handleCheckinClick = ({ id, active }: Checkin): void => {
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
        console.log(err);
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
      <Nav>
        <SearchInput onSubmit={handleSearchSubmit}>
          <input
            placeholder="Buscar por nome"
            name="filter"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
          />
          <button type="submit">
            <FiSearch size={16} style={{ margin: '8px', cursor: 'pointer' }} />
          </button>
        </SearchInput>
        <OpenCheckinButton onClick={() => setFilterActive('true')}>
          Abertos
        </OpenCheckinButton>
        <CloseCheckinButton onClick={() => setFilterActive('false')}>
          Fechados
        </CloseCheckinButton>
        <AllCheckinButton onClick={() => setFilterActive(null)}>
          Todos
        </AllCheckinButton>
        <p>
          (Total{' '}
          <strong>
            <b>{totalCheckins})</b>
          </strong>
        </p>
      </Nav>
      <CheckinGallery>
        {checkins.map(checkin => (
          <CheckinItem
            key={checkin.id}
            style={
              checkin.active
                ? { backgroundColor: '#245c2b', color: 'white' }
                : { backgroundColor: '#414941', color: 'white' }
            }
          >
            <h3>{checkin.person_name}</h3>
            <p>{checkin.companion_name}</p>
            <p>{checkin.formatted_created_at}</p>
            <div>
              {checkin.active && (
                <TiLockOpen
                  size={24}
                  onClick={() => handleCheckinClick(checkin)}
                  style={{ cursor: 'pointer' }}
                />
              )}
              {!checkin.active && <TiLockClosed size={24} />}
              <Link to={`/checkins/${checkin.id}/`}>
                <TiEye
                  size={24}
                  style={{ cursor: 'pointer' }}
                  color={'white'}
                />
              </Link>
            </div>
          </CheckinItem>
        ))}
      </CheckinGallery>
    </Container>
  );
};

export default CheckInList;
