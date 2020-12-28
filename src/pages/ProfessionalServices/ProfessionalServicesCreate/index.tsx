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
import Nav from '../../../components/Nav';

interface RouteParams {
  id: string;
}

interface ProfessionalServiceCreateData {
  id?: number;
  professional?: number;
  title?: string;
  description?: string;
}

const ProfessionalServicesCreate: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const [professional_name, setProfessionalName] = useState<string>('');
  const [professional_id, setProfessionalId] = useState<number | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    // eslint-disable-next-line no-undef
    const data: ProfessionalServiceCreateData = {};
    if (professional_id) data.professional = professional_id;
    if (description) data.description = description;
    if (title) data.title = title;

    try {
      await api.put(`/api/v1/professional_services/`, data);

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
      <Nav></Nav>

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
            <label htmlFor="title">Título</label>
            <input
              id="title"
              value={title}
              onChange={event => setTitle(event.target.value)}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />
          </FieldContainer>
        </FieldSet>
        <ConfirmButton text={'Atualizar'} />
      </RegisterUpdateForm>
    </Container>
  );
};

export default ProfessionalServicesCreate;
