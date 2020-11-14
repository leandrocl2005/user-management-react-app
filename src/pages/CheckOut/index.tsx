import React, { FormEvent, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import { CheckOutCard, Container, Content, SearchInput } from './styles';

interface Person {
  id: number;
  name: string;
  born_day: string;
  born_month: string;
  born_year: string;
}

interface ProfileFormData {
  id: number;
  open: boolean;
  updated_at_day: string;
  updated_at_month: string;
  updated_at_year: string;
}

const CheckOut: React.FC = () => {
  const [peopleWithOpenCheckIn, setPeopleWithOpenCheckIn] = useState<Person[]>(
    [],
  );
  const [searchingPeople, setSearchingPeople] = useState<Person[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [searchListVisibility, setSearchListVisibility] = useState(false);
  const [checkoutCardVisibility, setCheckoutCardVisibility] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const { addToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    async function loadPeopleWithOpenCheckin(): Promise<void> {
      const checkinResponse = await api.get('/checkins?open=true');
      const peopleIdsWithOpenCheckinArray = checkinResponse.data.map(
        (person: Person) => person.id,
      );

      const peopleResponse = await api.get('/users');
      const peopleWithOpenCheckInArray = peopleResponse.data.filter(
        (person: Person) => peopleIdsWithOpenCheckinArray.includes(person.id),
      );
      setPeopleWithOpenCheckIn(peopleWithOpenCheckInArray);
    }

    loadPeopleWithOpenCheckin();
  }, []);

  function handleInputChange(name: string): void {
    if (name === '') {
      setSearchListVisibility(false);
      setCheckoutCardVisibility(false);
      setInputValue('');
      return;
    }
    if (peopleWithOpenCheckIn.length >= 1) {
      const searchingPeopleArray = peopleWithOpenCheckIn
        .filter(person =>
          person.name ? person.name.toLowerCase().includes(name) : false,
        )
        .slice(0, 5);

      setSearchingPeople(searchingPeopleArray);
    }
    setCheckoutCardVisibility(false);
    setSearchListVisibility(true);
    setInputValue(name);
  }

  function handleSearchClick(person: Person): void {
    setSearchListVisibility(false);
    setInputValue('');
    setCheckoutCardVisibility(true);
    setSelectedPerson(person);
  }

  async function handleFormSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      if (!selectedPerson) {
        return;
      }
      const { id: selectedPersonId } = selectedPerson;
      const response = await api.get(
        `/checkins?open=true&user_id=${selectedPersonId}`,
      );
      if (!response) {
        return;
      }

      const { id } = response.data[0];

      const today = new Date();

      const data = {
        id,
        open: false,
        updated_at_day: today.getDate(),
        updated_at_year: today.getFullYear(),
        updated_at_month: today.getMonth(),
      };

      await api.patch(`/checkins/${data.id}`, data);

      setPeopleWithOpenCheckIn(
        peopleWithOpenCheckIn.filter(person => person.id !== selectedPersonId),
      );

      addToast({
        type: 'success',
        title: 'Checkout feito com sucesso!',
        description: 'Checkout com sucesso, utilize o menu para outras opções.',
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Falha no check-out',
        description:
          'Verifique se usuário está com check-in aberto ou tente denovo.',
      });
    } finally {
      setCheckoutCardVisibility(false);
    }
  }

  return (
    <Container>
      <Header />
      <Content>
        <h3>Busque pelo nome para fazer o check-out</h3>
        <SearchInput onSubmit={event => event.preventDefault()}>
          <input
            type="text"
            value={inputValue}
            onChange={event => handleInputChange(event.target.value)}
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
                <li key={person.id} onClick={() => handleSearchClick(person)}>
                  {person.name}
                </li>
              );
            })}
          </ul>
        </SearchInput>
        {checkoutCardVisibility && selectedPerson && (
          <CheckOutCard>
            <h3>{selectedPerson.name}</h3>
            <p>
              <strong>Dt.Nascimento:</strong>{' '}
              <span>{`${selectedPerson.born_day}/${selectedPerson.born_month}/${selectedPerson.born_year}`}</span>
            </p>
            <form onSubmit={event => handleFormSubmit(event)}>
              <button>Fazer checkout</button>
            </form>
          </CheckOutCard>
        )}
      </Content>
    </Container>
  );
};

export default CheckOut;
