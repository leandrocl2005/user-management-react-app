import React, { FormEvent, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import { Container, CheckBoxContainer, SelectContainer } from './styles';

import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import FieldContainer from '../../../components/FieldContainer';
import Nav from '../../../components/Nav';
import SearchForm from '../../../components/SearchForm';

import SelectPersonItem from '../../../components/SelectPersonItem';
import { Person, HomeServiceCreateData } from '../types';

const HomeServicesCreate: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  // Payload to create data
  const [homeService, setHomeService] = useState<HomeServiceCreateData>({
    breakfast: false,
    lunch: false,
    shower: false,
    dinner: false,
    snack: false,
    sleep: false,
  });

  // Select List, Input and Selected
  const [searchPersonInput, setSearchPersonInput] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [allPeople, setAllPeople] = useState<Person[]>([]);

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

  // Register new home service and redirect to home service page
  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    try {
      await api.post(`/api/v1/home_services/`, homeService);

      history.push('/home-services');

      addToast({
        type: 'success',
        title: 'Serviço registrado',
        description: 'Serviço registrado com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no servidor',
        description: 'Servidor offline. Tente mais tarde!',
      });
    }
  }

  // handle person select
  const handleSelectPersonClick = (person: Person): void => {
    setSelectedPerson(person);
    setSearchPersonInput('');
    setHomeService({
      ...homeService,
      person: person.id,
    });
  };

  return (
    <Container>
      <Header />
      <Nav>
        <SearchForm
          containerStyle={{ position: 'relative' }}
          onSubmit={event => event.preventDefault()}
        >
          <input
            placeholder="Buscar pessoa"
            name="filter"
            value={searchPersonInput}
            onChange={event => {
              setSearchPersonInput(event.target.value);
              setSelectedPerson(null);
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
                  handleClick={() => handleSelectPersonClick(person)}
                />
              ))}
          </SelectContainer>
        </SearchForm>
      </Nav>

      <RegisterUpdateForm onSubmit={handleSubmit}>
        <FieldSet>
          <legend>
            <strong>Identificação</strong>
          </legend>

          <FieldContainer>
            <label htmlFor="professional_name">Nome da pessoa</label>
            <input
              style={{ color: '#999' }}
              id="professional_name"
              type="text"
              name="professional_name"
              value={selectedPerson ? selectedPerson.name : ''}
              placeholder="Nome do profissional"
              autoComplete="off"
              disabled
            />
          </FieldContainer>
        </FieldSet>

        <FieldSet>
          <legend>
            <strong>Refeições</strong>
          </legend>

          <CheckBoxContainer htmlFor="breakfast">
            <strong>Café da manhã</strong>
            <input
              id="breakfast"
              type="checkbox"
              name="breakfast"
              checked={homeService.breakfast}
              onChange={() =>
                setHomeService({
                  ...homeService,
                  breakfast: !homeService.breakfast,
                })
              }
            />
            <span></span>
          </CheckBoxContainer>
          <CheckBoxContainer htmlFor="lunch">
            <strong>Almoço</strong>
            <input
              id="lunch"
              type="checkbox"
              name="lunch"
              onChange={() =>
                setHomeService({
                  ...homeService,
                  lunch: !homeService.lunch,
                })
              }
            />
            <span></span>
          </CheckBoxContainer>
          <CheckBoxContainer htmlFor="snack">
            <strong>Lanche da tarde</strong>
            <input
              id="snack"
              type="checkbox"
              name="snack"
              onChange={() =>
                setHomeService({
                  ...homeService,
                  snack: !homeService.snack,
                })
              }
            />
            <span></span>
          </CheckBoxContainer>
          <CheckBoxContainer htmlFor="dinner">
            <strong>Jantar</strong>
            <input
              id="dinner"
              type="checkbox"
              name="dinner"
              onChange={() =>
                setHomeService({
                  ...homeService,
                  dinner: !homeService.dinner,
                })
              }
            />
            <span></span>
          </CheckBoxContainer>
        </FieldSet>

        <FieldSet>
          <legend>
            <strong>Outros serviços</strong>
          </legend>
          <CheckBoxContainer htmlFor="shower">
            <strong>Banho</strong>
            <input
              id="shower"
              type="checkbox"
              name="shower"
              onChange={() =>
                setHomeService({
                  ...homeService,
                  shower: !homeService.shower,
                })
              }
            />
            <span></span>
          </CheckBoxContainer>
          <CheckBoxContainer htmlFor="sleep">
            <strong>Per noite</strong>
            <input
              id="sleep"
              type="checkbox"
              name="sleep"
              onChange={() =>
                setHomeService({
                  ...homeService,
                  sleep: !homeService.sleep,
                })
              }
            />
            <span></span>
          </CheckBoxContainer>
        </FieldSet>
        <ConfirmButton text={'Registrar'} />
      </RegisterUpdateForm>
    </Container>
  );
};

export default HomeServicesCreate;
