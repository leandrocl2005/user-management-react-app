import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import SelectPersonItem from '../SelectPersonItem';

import { Container, SelectContainer } from './styles';

type DynamicSearchFormProps = {
  handleSelect: (person: Person) => void;
};

export type Person = {
  id: number;
  name: string;
  formatted_born_date: string;
  avatar: string;
};

const DynamicSearchForm: React.FC<DynamicSearchFormProps> = ({
  handleSelect,
  ...rest
}) => {
  const { addToast } = useToast();

  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [searchPersonInput, setSearchPersonInput] = useState<string>('');
  // Load people on input search submit
  useEffect(() => {
    async function loadPeople(): Promise<void> {
      try {
        let url = '/api/v1/people/?limit=4';
        if (searchPersonInput) {
          url += `&search=${searchPersonInput}`;
          const response = await api.get(url);
          setAllPeople(response.data.results);
        } else {
          setAllPeople([]);
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Servidor offline. Tente mais tarde!',
        });
      }
    }
    loadPeople();
  }, [addToast, searchPersonInput]);

  return (
    <Container {...rest}>
      <input
        placeholder="Buscar pessoa"
        name="filter"
        value={searchPersonInput}
        onChange={event => {
          setSearchPersonInput(event.target.value);
        }}
        autoComplete="off"
      />
      <SelectContainer
        style={{
          display: allPeople.length !== 0 ? 'block' : 'none',
        }}
      >
        {allPeople &&
          allPeople.map(person => (
            <SelectPersonItem
              person={person}
              key={person.id}
              handleClick={() => {
                setSearchPersonInput('');
                handleSelect(person);
              }}
            />
          ))}
      </SelectContainer>
      <button type="button">
        <FiSearch size={16} style={{ margin: '8px' }} />
      </button>
    </Container>
  );
};

export default DynamicSearchForm;
