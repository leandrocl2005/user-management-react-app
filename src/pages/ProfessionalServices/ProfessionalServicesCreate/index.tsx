import React, { FormEvent, useState } from 'react';

import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import FieldContainer from '../../../components/FieldContainer';
import { Person, ProfessionalServiceCreateData } from '../types';
import DynamicSearchForm from '../../../components/DynamicSearchForm/indext';

const ProfessionalServicesCreate: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  // Payload to create data
  const [professionalService, setProfessionalService] = useState<
    ProfessionalServiceCreateData
  >({});

  // Select List, Input and Selected
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    try {
      await api.post(`/api/v1/professional_services/`, professionalService);

      history.push('/professional-services');

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

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name !== 'professional_name')
      setProfessionalService({
        ...professionalService,
        [e.target.name]: e.target.value,
      });
  };

  const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>): void =>
    setProfessionalService({
      ...professionalService,
      [e.target.name]: e.target.value,
    });

  const handleSelectPersonClick = (person: Person): void => {
    setSelectedPerson(person);
    setProfessionalService({
      ...professionalService,
      professional: person.id,
    });
  };

  return (
    <Container>
      <Header />

      <RegisterUpdateForm onSubmit={handleSubmit}>
        <FieldSet>
          <legend>
            <strong>Serviço profissional</strong>
          </legend>
          <DynamicSearchForm handleSelect={handleSelectPersonClick} />
          <FieldContainer>
            <label htmlFor="professional_name">Nome do profissional</label>
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

          <FieldContainer>
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Digite um título"
              onChange={onChangeInput}
              autoComplete="off"
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              placeholder="Descrição ..."
              onChange={onChangeTextArea}
              autoComplete="off"
            />
          </FieldContainer>
        </FieldSet>
        <ConfirmButton text={'Registrar'} />
      </RegisterUpdateForm>
    </Container>
  );
};

export default ProfessionalServicesCreate;
