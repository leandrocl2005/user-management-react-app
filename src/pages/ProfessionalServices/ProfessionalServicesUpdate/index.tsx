import React, { FormEvent, useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

import Header from '../../../components/Header';
import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import FieldContainer from '../../../components/FieldContainer';
import {
  ProfessionalServiceListData,
  ProfessionalServiceUpdateData,
} from '../types';

interface RouteParams {
  id: string;
}

const ProfessionalServicesUpdate: React.FC = () => {
  const params = useParams<RouteParams>();

  const { addToast } = useToast();
  const history = useHistory();

  // Payload to update professional service
  const [
    professionalService,
    setProfessionalService,
  ] = useState<ProfessionalServiceListData | null>(null);

  useEffect(() => {
    async function loadProfessionalService(): Promise<void> {
      try {
        const response = await api.get(
          `/api/v1/professional_services/${params.id}/`,
        );
        setProfessionalService(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Ocorreu um erro no servidor, tente mais tarde!',
        });
      }
    }
    loadProfessionalService();
  }, [addToast, params]);

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    if (professionalService) {
      const data: ProfessionalServiceUpdateData = {
        title: professionalService.title,
        professional: professionalService.professional,
        description: professionalService.description,
      };
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
    }
  }

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (professionalService) {
      setProfessionalService({
        ...professionalService,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    if (professionalService) {
      setProfessionalService({
        ...professionalService,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Container>
      <Header />
      <RegisterUpdateForm onSubmit={handleSubmit}>
        <FieldSet>
          <legend>
            <strong>Serviço profissional</strong>
          </legend>

          <FieldContainer>
            <label htmlFor="professional_name">Nome do profissional</label>
            <input
              style={{ color: '#999' }}
              id="professional_name"
              value={
                professionalService ? professionalService.professional_name : ''
              }
              disabled
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="service_date">Data do serviço</label>
            <input
              style={{ color: '#999' }}
              id="service_date"
              value={
                professionalService
                  ? professionalService.formatted_created_at
                  : ''
              }
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
              value={professionalService ? professionalService.title : ''}
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
              value={professionalService ? professionalService.description : ''}
              onChange={onChangeTextArea}
              autoComplete="off"
            />
          </FieldContainer>
        </FieldSet>
        <ConfirmButton text={'Atualizar'} />
      </RegisterUpdateForm>
    </Container>
  );
};

export default ProfessionalServicesUpdate;
