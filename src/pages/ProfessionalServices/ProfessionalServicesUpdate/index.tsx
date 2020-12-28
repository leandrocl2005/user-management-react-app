import React, { FormEvent, useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import { Container } from './styles';

import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import FieldContainer from '../../../components/FieldContainer';

interface RouteParams {
  id: string;
}

interface ProfessionalServiceUpdateData {
  id?: number;
  professional?: number;
  title?: string;
  description?: string;
}

const ProfessionalServicesUpdate: React.FC = () => {
  const params = useParams<RouteParams>();
  const { addToast } = useToast();
  const history = useHistory();

  const [professional_name, setProfessionalName] = useState('');
  const [professional_id, setProfessionalId] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [professional_service_date, setServiceDate] = useState('');

  useEffect(() => {
    async function loadProfessionalService(): Promise<void> {
      try {
        const response = await api.get(
          `/api/v1/professional_services/${params.id}/`,
        );
        setProfessionalName(response.data.professional_name);
        setProfessionalId(response.data.professional);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setServiceDate(response.data.formatted_created_at);
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

    // eslint-disable-next-line no-undef
    const data: ProfessionalServiceUpdateData = {
      professional: professional_id,
      description,
      title,
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
              value={professional_name}
              disabled
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="service_date">Data do serviço</label>
            <input
              style={{ color: '#999' }}
              id="service_date"
              value={professional_service_date}
              disabled
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="title">Título</label>
            <input
              id="title"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="description">Descrição</label>
            <textarea id="description" value={description} />
          </FieldContainer>
        </FieldSet>
        <ConfirmButton text={'Atualizar'} />
      </RegisterUpdateForm>
    </Container>
  );
};

export default ProfessionalServicesUpdate;
