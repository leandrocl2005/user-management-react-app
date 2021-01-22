import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import { Container, PersonItem, CardBody } from './styles';

import Header from '../../../components/Header';
import SearchForm from '../../../components/SearchForm';
import Nav from '../../../components/Nav';
import Avatar from '../../../components/Avatar';
import GalleryContainer from '../../../components/GalleryContainer';

import { PersonListData } from '../types';

const Personlist: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchSubmit, setSearchSubmit] = useState('');

  const [listPerson, setListPerson] = useState<PersonListData[]>([]);
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
      <Nav total={totalPerson} pathCreate={'/create-people'}>
        <SearchForm onSubmit={handleSearchSubmit}>
          <input
            placeholder="Buscar por nome"
            name="filter"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
          />
        </SearchForm>
      </Nav>
      <GalleryContainer>
        {listPerson.map(person => (
          <PersonItem
            key={person.id}
            onClick={() => handleCardClick(person.id)}
          >
            <Avatar src={''} alt={''} />
            <CardBody>
              <p>Nome</p>
              <h3>{person.name}</h3>
              <p>Dt. Nascimento</p>
              <h4>{person.formatted_born_date}</h4>
            </CardBody>
          </PersonItem>
        ))}
      </GalleryContainer>
    </Container>
  );
};

export default Personlist;
