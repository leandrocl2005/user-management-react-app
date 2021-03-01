import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

import Header from '../../../components/Header';
import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import FieldContainer from '../../../components/FieldContainer';
import DynamicSearchForm from '../../../components/DynamicSearchForm';

import { Person, ProfessionalServiceCreateData } from '../types';

const ProfessionalServicesCreate: React.FC = () => {

  const { register, handleSubmit, errors } = useForm<ProfessionalServiceCreateData>();

  const { addToast } = useToast();
  const history = useHistory();

  // Select List, Input and Selected
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  // handle submit
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(async (data: ProfessionalServiceCreateData) => {

      if (data.professional === -1) {
        console.log("Invalid", data);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0; /* to Safari */
        addToast({
          type: 'error',
          title: 'Selecione o profissional',
          description: 'Para este registro é necessário selecionar o profissional',
        });
        return false;
      }

      try {
        await api.post(`/api/v1/professional_services/`, data);

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
    })(e)
  }

  const handleSelectPersonClick = (person: Person): void => {
    setSelectedPerson(person);
  };

  return (
    <Container>
      <Header />

      <RegisterUpdateForm onSubmit={onSubmit}>
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
              type="text"
              id="title"
              name="title"
              placeholder="Digite um título"
              autoComplete="off"
              ref={register({
                required: true,
                maxLength: 60,
                minLength: 10
              })}
              style={{
                borderColor: errors.title ? 'red' : '#d3e2e5'
              }}
            />
            {errors.title && errors.title.type === "required" && (
              <div style={{ color: 'red' }}>
                Este campo é obrigatório.
              </div>
            )}
            {errors.title && errors.title.type === "minLength" && (
              <div style={{ color: 'red' }}>
                Mínimo de 10 caracters.
              </div>
            )}
            {errors.title && errors.title.type === "maxLength" && (
              <div style={{ color: 'red' }}>
                Máximo de 60 caracteres.
              </div>
            )}
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              placeholder="Digite uma descrição"
              ref={register({
                required: true,
                minLength: 60,
                maxLength: 400,
              })}
              style={{
                borderColor: errors.title ? 'red' : '#d3e2e5'
              }}
            />
            {errors.description && errors.description.type === "required" && (
              <div style={{ color: 'red' }}>
                Este campo é obrigatório.
              </div>
            )}
            {errors.description && errors.description.type === "minLength" && (
              <div style={{ color: 'red' }}>
                Mínimo de 60 caracters.
              </div>
            )}
            {errors.description && errors.description.type === "maxLength" && (
              <div style={{ color: 'red' }}>
                Máximo de 400 caracters.
              </div>
            )}
          </FieldContainer>
        </FieldSet>

        <input
          type="hidden"
          id="professional"
          name="professional"
          value={selectedPerson ? selectedPerson.id : -1}
          ref={register}
        />
        <ConfirmButton text={'Registrar'} />
      </RegisterUpdateForm>
    </Container>
  );
};

export default ProfessionalServicesCreate;
