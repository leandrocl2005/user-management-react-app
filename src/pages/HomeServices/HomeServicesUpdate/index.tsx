import React, { FormEvent, useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';

import { Container, CheckBoxContainer } from './styles';

import Header from '../../../components/Header';
import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import FieldContainer from '../../../components/FieldContainer';
import { HomeServiceListData, HomeServiceUpdateData } from '../types';

interface RouteParams {
  id: string;
}

const HomeServicesUpdate: React.FC = () => {
  const params = useParams<RouteParams>();

  const { addToast } = useToast();
  const history = useHistory();

  // Payload to update professional service
  const [homeService, setHomeService] = useState<HomeServiceListData | null>(
    null,
  );

  useEffect(() => {
    async function loadHomeService(): Promise<void> {
      try {
        const response = await api.get(`/api/v1/home_services/${params.id}/`);
        setHomeService(response.data);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Ocorreu um erro no servidor, tente mais tarde!',
        });
      }
    }
    loadHomeService();
  }, [addToast, params]);

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    if (homeService) {
      const data: HomeServiceUpdateData = {
        breakfast: homeService.breakfast,
        lunch: homeService.lunch,
        shower: homeService.shower,
        dinner: homeService.dinner,
        snack: homeService.snack,
        sleep: homeService.sleep,
        person: homeService.person,
      };
      try {
        await api.put(`/api/v1/home_services/${params.id}/`, data);

        history.push('/home-services');

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

  return (
    <Container>
      <Header />
      <RegisterUpdateForm onSubmit={handleSubmit}>
        <FieldSet>
          <legend>
            <strong>Identificação</strong>
          </legend>

          <FieldContainer>
            <label htmlFor="person_name">Nome da pessoa</label>
            <input
              style={{ color: '#999' }}
              id="person_name"
              value={homeService ? homeService.person_name : ''}
              disabled
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="service_date">Data do serviço</label>
            <input
              style={{ color: '#999' }}
              id="service_date"
              value={homeService ? homeService.formatted_created_at : ''}
              disabled
            />
          </FieldContainer>
        </FieldSet>
        <FieldSet>
          <legend>
            <strong>Alimentação</strong>
          </legend>

          <CheckBoxContainer htmlFor="breakfast">
            <strong>Café da manhã</strong>
            <input
              id="breakfast"
              type="checkbox"
              name="breakfast"
              checked={homeService ? homeService.breakfast : false}
              onChange={() => {
                if (homeService) {
                  setHomeService({
                    ...homeService,
                    breakfast: !homeService.breakfast,
                  });
                }
              }}
            />
            <span></span>
          </CheckBoxContainer>

          <CheckBoxContainer htmlFor="lunch">
            <strong>Almoço</strong>
            <input
              id="lunch"
              type="checkbox"
              name="lunch"
              checked={homeService ? homeService.lunch : false}
              onChange={() => {
                if (homeService) {
                  setHomeService({
                    ...homeService,
                    lunch: !homeService.lunch,
                  });
                }
              }}
            />
            <span></span>
          </CheckBoxContainer>
          <CheckBoxContainer htmlFor="snack">
            <strong>Lanche da tarde</strong>
            <input
              id="snack"
              type="checkbox"
              name="snack"
              checked={homeService ? homeService.snack : false}
              onChange={() => {
                if (homeService) {
                  setHomeService({
                    ...homeService,
                    snack: !homeService.snack,
                  });
                }
              }}
            />
            <span></span>
          </CheckBoxContainer>
          <CheckBoxContainer htmlFor="dinner">
            <strong>Jantar</strong>
            <input
              id="dinner"
              type="checkbox"
              name="dinner"
              checked={homeService ? homeService.dinner : false}
              onChange={() => {
                if (homeService) {
                  setHomeService({
                    ...homeService,
                    dinner: !homeService.dinner,
                  });
                }
              }}
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
              checked={homeService ? homeService.shower : false}
              onChange={() => {
                if (homeService) {
                  setHomeService({
                    ...homeService,
                    shower: !homeService.shower,
                  });
                }
              }}
            />
            <span></span>
          </CheckBoxContainer>
          <CheckBoxContainer htmlFor="sleep">
            <strong>Per noite</strong>
            <input
              id="sleep"
              type="checkbox"
              name="sleep"
              checked={homeService ? homeService.sleep : false}
              onChange={() => {
                if (homeService) {
                  setHomeService({
                    ...homeService,
                    sleep: !homeService.sleep,
                  });
                }
              }}
            />
            <span></span>
          </CheckBoxContainer>
        </FieldSet>
        <ConfirmButton text={'Atualizar'} />
      </RegisterUpdateForm>
    </Container>
  );
};

export default HomeServicesUpdate;
