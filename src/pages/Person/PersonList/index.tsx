import React, { FormEvent, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import avatar from '../../../assets/avatar.png';
import Header from '../../../components/Header';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';
import {
  Container,
  PersonGallery,
  PersonItem,
  Nav,
  SearchInput,
  Avatar,
  CardBody,
} from './styles';

interface Person {
  id: number;
  name: string;
  formatted_born_date: string;
}

const Personlist: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchSubmit, setSearchSubmit] = useState('');
  const [listPerson, setListPerson] = useState<Person[]>([]);
  const [totalPerson, setTotalPerson] = useState(0);
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    async function loadPersonList(): Promise<void> {
      try {
        let url = '/api/v1/people/?';
        url += `search=${searchSubmit}`;
        const response = await api.get(url);
        setListPerson(response.data.results);
        setTotalPerson(response.data.count);
      } catch (error) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Servidor offline. Tente mais tarde!',
        });
      }
    }
    loadPersonList();
  }, [addToast, searchSubmit]);

  const handleSearchSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setSearchSubmit(searchInput);
  };

  const handleCardClick = (id: number): void => {
    history.push(`/people/${id}`);
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
        <Link to={'/create-people'}>Novo cadastro</Link>
        <p>
          (Total{' '}
          <strong>
            <b>{totalPerson})</b>
          </strong>
        </p>
      </Nav>
      <PersonGallery>
        {listPerson.map(person => (
          <PersonItem
            key={person.id}
            onClick={() => handleCardClick(person.id)}
          >
            <Avatar>
              <img src={avatar} alt={person.name} />
            </Avatar>
            <CardBody>
              <p>Nome</p>
              <h3>{person.name}</h3>
              <p>Dt. Nascimento</p>
              <h4>{person.formatted_born_date}</h4>
            </CardBody>
          </PersonItem>
        ))}
      </PersonGallery>
    </Container>
  );
};

export default Personlist;
