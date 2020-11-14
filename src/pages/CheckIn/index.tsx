import React, { FormEvent, useEffect, useState } from 'react';

import { FiChevronDown, FiSearch } from 'react-icons/fi';
import { Container, Content, SearchInput, SelectInput } from './styles';
import Header from '../../components/Header';
import api from '../../services/api';

interface Person {
  id: number;
  name: string;
  born_day: number;
  born_month: number;
  born_year: number;
}

interface PersonType {
  id: number;
  name: string;
}

const CheckIn: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [searchingPeople, setSearchingPeople] = useState<Person[]>([]);
  const [searchInputPerson, setSearchInputPerson] = useState<Person | null>(
    null,
  );
  const [searchInputValue, setSearchInputValue] = useState('');
  const [searchListVisibility, setSearchListVisibility] = useState(false);

  const [personTypeVisibility, setPersonTypeVisibility] = useState(false);
  const [personTypes, setPersonTypes] = useState<PersonType[]>([]);
  const [
    selectedPersonType,
    setSelectedPersonType,
  ] = useState<PersonType | null>(null);
  const [personTypesListVisibility, setPersonTypesListVisibility] = useState(
    false,
  );

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

  useEffect(() => {
    async function loadPersonTypes(): Promise<void> {
      try {
        const response = await api.get('/people_types');
        setPersonTypes(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadPersonTypes();
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

  function handleClickListSearch(person: Person): void {
    setSearchInputPerson(person);
    setSearchListVisibility(false);
    setSearchInputValue(person.name);
    setPersonTypeVisibility(true);
    setSelectedPersonType(null);
  }

  function handlePersonTypeListClick(personType: PersonType): void {
    setSelectedPersonType(personType);
    setPersonTypesListVisibility(false);
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
            name="person"
            value={searchInputValue}
            onChange={event => handleSearchInputOnChange(event.target.value)}
            onClick={() => setPersonTypeVisibility(false)}
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
              return (
                <li
                  onClick={() => handleClickListSearch(person)}
                  key={person.id}
                >
                  {person.name}
                </li>
              );
            })}
          </ul>
        </SearchInput>

        {personTypeVisibility && (
          <>
            <h1>Qual a função do visitante na casa?</h1>
            <SelectInput onClick={event => event.preventDefault()}>
              <input
                autoComplete="off"
                disabled
                placeholder=""
                name="person"
                value={selectedPersonType ? selectedPersonType.name : ''}
                onClick={() => setPersonTypeVisibility(true)}
              />
              <button
                type="submit"
                onClick={() =>
                  setPersonTypesListVisibility(!personTypesListVisibility)
                }
              >
                <FiChevronDown />
              </button>

              <ul
                style={
                  personTypesListVisibility
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
                {personTypes.map(personType => {
                  return (
                    <li
                      onClick={() => handlePersonTypeListClick(personType)}
                      key={personType.id}
                    >
                      {personType.name}
                    </li>
                  );
                })}
              </ul>
            </SelectInput>
          </>
        )}
      </Content>
    </Container>
  );
};

export default CheckIn;
