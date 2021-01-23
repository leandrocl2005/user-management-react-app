import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import { Container, CheckBoxContainer } from './styles';

import Header from '../../../components/Header';
import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import FieldContainer from '../../../components/FieldContainer';
import DynamicSearchForm from '../../../components/DynamicSearchForm';

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

  // Select Person
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  // Register new home service and redirect to home service page
  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    const data = {
      ...homeService,
    };

    try {
      await api.post(`/api/v1/home_services/`, data);

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
    setHomeService({
      ...homeService,
      person: person.id,
    });
  };

  return (
    <Container>
      <Header />

      <RegisterUpdateForm onSubmit={handleSubmit}>
        <FieldSet>
          <legend>
            <strong>Identificação</strong>
          </legend>

          <DynamicSearchForm handleSelect={handleSelectPersonClick} />

          <FieldContainer>
            <label htmlFor="person_name">Nome da pessoa</label>
            <input
              style={{ color: '#999' }}
              id="person_name"
              type="text"
              name="person_name"
              value={selectedPerson ? selectedPerson.name : ''}
              placeholder="Nome da pessoa"
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
