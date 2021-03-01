import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

import Header from '../../../components/Header';
import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import FieldContainer from '../../../components/FieldContainer';

import { ProfessionalServiceLoadData, ProfessionalServiceUpdateData } from '../types';

interface RouteParams {
  id: string;
}

const ProfessionalServicesUpdate: React.FC = () => {
  const params = useParams<RouteParams>();
  const { addToast } = useToast();
  const history = useHistory();

  const defaultValues = {
    professional: -1,
    title: '',
    description: '',
  }
  // data for submit
  const { handleSubmit, reset, errors, control } = useForm<ProfessionalServiceUpdateData>({
    defaultValues
  });
  // data for user view
  const [professionalService, setProfessionalService] = useState<
    ProfessionalServiceLoadData
  >({
    professional: -1,
    title: '',
    description: '',
    professional_name: '',
    formatted_created_at: '',
  });

  // load data for submit and data for user view
  useEffect(() => {
    async function loadProfessionalService(): Promise<void> {
      try {
        const response = await api.get(
          `/api/v1/professional_services/${params.id}/`,
        );
        setProfessionalService(response.data);
        reset({
          professional: response.data.professional,
          title: response.data.title,
          description: response.data.description
        })
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Ocorreu um erro no servidor, tente mais tarde!',
        });
      }
    }
    loadProfessionalService();
  }, [addToast, params, reset]);

  // handle submit
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleSubmit(async (data: ProfessionalServiceUpdateData) => {
      try {
        await api.put(`/api/v1/professional_services/${params.id}/`, data);

        history.push('/professional-services');

        addToast({
          type: 'success',
          title: 'Serviço atualizado',
          description: 'Serviço atualizado com sucesso!',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Servidor offline. Tente mais tarde!',
        });
      }
    })(e);
  }

  // form
  return (
    <Container>
      <Header />
      <RegisterUpdateForm onSubmit={onSubmit}>
        <FieldSet>
          <legend>
            <strong>Serviço profissional</strong>
          </legend>

          {/* field professional name disabled*/}
          <FieldContainer>
            <label htmlFor="professional_name">Nome do profissional</label>
            <input
              style={{ color: '#999' }}
              id="professional_name"
              value={professionalService.professional_name}
              disabled
            />
          </FieldContainer>

          {/* field formatted_created_at disabled*/}
          <FieldContainer>
            <label htmlFor="formatted_created_at">Data do serviço</label>
            <input
              style={{ color: '#999' }}
              id="formatted_created_at"
              value={professionalService.formatted_created_at}
              disabled
            />
          </FieldContainer>

          {/* field title */}
          <FieldContainer>
            <label htmlFor="title">Título</label>
            <Controller
              as={
                <input
                  id="title"
                  autoComplete="off"
                  style={{
                    borderColor: errors.title ? 'red' : '#d3e2e5'
                  }}
                />
              }
              name="title"
              control={control}
              rules={{
                required: true,
                maxLength: 60,
                minLength: 10
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

          {/* field description*/}
          <FieldContainer>
            <label htmlFor="description">Descrição</label>
            <Controller as={
              <textarea
                id="description"
                autoComplete="off"
                style={{
                  borderColor: errors.description ? 'red' : '#d3e2e5'
                }}
              />}
              name="description"
              control={control}
              rules={{
                required: true,
                minLength: 60,
                maxLength: 400,
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

          {/* field professional hidden */}
          <Controller as={
            <input type="hidden" />
          }
            name="professional"
            control={control}
          />

        </FieldSet>

        <ConfirmButton text={'Atualizar'} />

      </RegisterUpdateForm>
    </Container>
  );
};

export default ProfessionalServicesUpdate;
