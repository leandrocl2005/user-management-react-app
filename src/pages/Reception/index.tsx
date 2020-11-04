import React, { FormEvent, useEffect, useState } from 'react';

import { FiSearch } from 'react-icons/fi';
import { isNamedExportBindings } from 'typescript';
import { Container, Content, SearchInput } from './styles';
import Header from '../../components/Header';
import api from '../../services/api';

interface Person {
  id: number;
  name: string;
  born_day: number;
  born_month: number;
  born_year: number;
}

const Reception: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchingPeople, setSearchingPeople] = useState<Person[]>([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchListVisibility, setSearchListVisibility] = useState(false);

  useEffect(() => {
    async function loadPeople(): Promise<void> {
      const response = await api.get('/users');
      setPeople(
        response.data.map((person: Person) => {
          return {
            ...person,
            born: `${person.born_day}/${person.born_month}/${person.born_year}`,
          };
        }),
      );
    }

    loadPeople();
  }, []);

  function handleSearchInputOnChange(name: string): void {
    if (name === '') {
      setSearchListVisibility(false);
      setSearchInputValue('');
      return;
    }
    if (people.length >= 1) {
      const searchingPeopleArray = people
        .filter(person =>
          person.name ? person.name.toLowerCase().includes(name) : false,
        )
        .slice(0, 5);

      setSearchingPeople(searchingPeopleArray);
    }
    setSearchInputValue(name);
    setSearchListVisibility(true);
  }

  return (
    <Container>
      <Header />

      <Content>
        <h1>Quem você deseja recepcionar?</h1>
        <SearchInput
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <input
            autoComplete="off"
            placeholder="Buscar por nome"
            name="filter"
            value={searchInputValue}
            onChange={event => handleSearchInputOnChange(event.target.value)}
          />
          <button type="submit">
            <FiSearch size={16} style={{ margin: '8px', cursor: 'pointer' }} />
          </button>
          <ul
            style={
              searchListVisibility
                ? {
                    visibility: 'visible',
                    display: 'block',
                  }
                : {
                    visibility: 'hidden',
                    display: 'none',
                  }
            }
          >
            {searchingPeople.map(person => {
              return <li key={person.id}>{person.name}</li>;
            })}
          </ul>
        </SearchInput>
      </Content>
    </Container>
  );
};

export default Reception;
