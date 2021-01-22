import React, { FormEvent, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import Header from '../../../components/Header';
import SelectPersonItem from '../../../components/SelectPersonItem';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import FieldContainer from '../../../components/FieldContainer';
import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import {
  CheckinUpdateNoPatientData,
  CheckinUpdatePatientData,
  Person,
} from '../types';

import {
  CheckBoxContainer,
  Container,
  InputSelect,
  MedicalProceduresContainer,
  SelectContainer,
  SearchForm,
} from './styles';

const reasonOptions = [
  { value: 'companion', label: 'Acompanhante' },
  { value: 'professional', label: 'Profissional' },
  { value: 'voluntary', label: 'Voluntário' },
  { value: 'visitor', label: 'Visitante' },
  { value: 'other', label: 'Outro' },
];

interface RouteParams {
  id: string;
}

const CheckInUpdate: React.FC = () => {
  const { addToast } = useToast();
  const params = useParams<RouteParams>();

  const [isPatient, setIsPatient] = useState(false);

  const [checkinPatient, setCheckinPatient] = useState<
    CheckinUpdatePatientData
  >({
    id: 0,
    person: 0,
    person_name: '',
    companion: 0,
    companion_name: 0,
    reason: 'patient',
    chemotherapy: false,
    radiotherapy: false,
    surgery: false,
    exams: false,
    appointment: false,
    other: false,
    ca_number: '',
    social_vacancy: false,
    observation: '',
  });
  const [checkinNoPatient, setCheckinNoPatient] = useState<
    CheckinUpdateNoPatientData
  >({
    id: 0,
    person: 0,
    person_name: '',
    reason: '',
  });

  // Select List, Input and Selected
  const [searchCompanionInput, setSearchCompanionInput] = useState('');
  const [selectedCompanion, setSelectedCompanion] = useState<Person | null>(
    null,
  );
  const [allCompanions, setAllCompanions] = useState<Person[]>([]);

  // load checkin data to update
  useEffect(() => {
    async function loadCheckin(): Promise<void> {
      try {
        const response = await api.get(`/api/v1/checkins/${params.id}/`);
        if (response.data.reason === 'patient') {
          setIsPatient(true);
          setCheckinPatient(response.data);
          setSelectedCompanion({
            id: response.data.companion,
            name: response.data.companion_name,
            formatted_born_date: '',
            avatar: response.data.companion,
          });
        } else {
          setIsPatient(false);
          const data = {
            id: response.data.id,
            person: response.data.person,
            person_name: response.data.person_name,
            reason: response.data.reason,
          };
          setCheckinNoPatient(data);
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Ocorreu um erro no servidor, tente mais tarde!',
        });
      }
    }
    loadCheckin();
  }, [addToast, params]);

  // load companion input items to select
  useEffect(() => {
    async function loadCompanions(): Promise<void> {
      try {
        let url = '/api/v1/people/?limit=4';
        if (searchCompanionInput) {
          url += `&search=${searchCompanionInput}`;
          const response = await api.get(url);
          setAllCompanions(response.data.results);
        } else {
          setAllCompanions([]);
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Servidor offline. Tente mais tarde!',
        });
      }
    }
    loadCompanions();
  }, [addToast, searchCompanionInput]);

  // handle companion select
  const handleSelectCompanionClick = (person: Person): void => {
    setSelectedCompanion(person);
    setSearchCompanionInput('');
    setCheckinPatient({
      ...checkinPatient,
      companion: person.id,
    });
  };

  async function handleSubmitPatient(event: FormEvent): Promise<void> {
    event.preventDefault();

    const data = {
      person: checkinPatient.person,
      reason: 'patient',
      companion: checkinPatient.companion,
      chemotherapy: checkinPatient.chemotherapy,
      radiotherapy: checkinPatient.radiotherapy,
      surgery: checkinPatient.surgery,
      exams: checkinPatient.exams,
      appointment: checkinPatient.appointment,
      other: checkinPatient.other,
      ca_number: checkinPatient.ca_number,
      social_vacancy: checkinPatient.social_vacancy,
      observation: checkinPatient.observation,
    };

    try {
      await api.put(`/api/v1/checkins/${params.id}/`, data);

      addToast({
        type: 'success',
        title: 'Checkin registrado',
        description: 'Checkin atualizado com sucesso!',
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro no servidor',
        description: 'Servidor offline. Tente mais tarde!',
      });
    }
  }

  // Register new home service and redirect to home service page
  async function handleSubmitNoPatient(event: FormEvent): Promise<void> {
    event.preventDefault();

    const data = {
      person: checkinNoPatient.person,
      reason: checkinNoPatient.reason,
    };

    try {
      await api.put(`/api/v1/checkins/${params.id}/`, data);

      addToast({
        type: 'success',
        title: 'Checkin registrado',
        description: 'Checkin registrado com sucesso!',
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

      {!isPatient && (
        <>
          <RegisterUpdateForm onSubmit={handleSubmitNoPatient}>
            <FieldSet>
              <legend>
                <strong>Identificação</strong>
              </legend>

              <FieldContainer>
                <label htmlFor="person_name">Nome da pessoa</label>
                <input
                  style={{ color: '#999' }}
                  id="person_name"
                  type="text"
                  name="person_name"
                  value={checkinNoPatient.person_name}
                  placeholder="Nome da pessoa"
                  autoComplete="off"
                  disabled
                />
              </FieldContainer>
              <FieldContainer>
                <label htmlFor="reason">Tipo de checkin</label>
                <InputSelect
                  id="reason"
                  value={checkinNoPatient.reason}
                  onChange={event => {
                    if (event.target.value !== '0') {
                      setCheckinNoPatient({
                        ...checkinNoPatient,
                        reason: event.target.value,
                      });
                    }
                  }}
                >
                  <option disabled value="0">
                    Selecione...
                  </option>
                  {reasonOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </InputSelect>
              </FieldContainer>
            </FieldSet>
            <ConfirmButton text={'Atualizar checkin'} />
          </RegisterUpdateForm>
        </>
      )}

      {isPatient && (
        <>
          <RegisterUpdateForm onSubmit={handleSubmitPatient}>
            <FieldSet>
              <legend>
                <strong>Identificação do paciente</strong>
              </legend>

              <FieldContainer>
                <label htmlFor="person_name">Nome da pessoa</label>
                <input
                  style={{ color: '#999' }}
                  id="person_name"
                  type="text"
                  name="person_name"
                  value={checkinPatient.person_name || ''}
                  placeholder="Nome da pessoa"
                  autoComplete="off"
                  disabled
                />
              </FieldContainer>
              <FieldContainer>
                <label htmlFor="reason">Tipo de checkin</label>
                <InputSelect id="reason" disabled value={'patient'}>
                  <option disabled defaultChecked value="patient">
                    Paciente
                  </option>
                </InputSelect>
              </FieldContainer>
            </FieldSet>
            <FieldSet>
              <legend>
                <strong>Identificação do motivo</strong>
              </legend>
              <MedicalProceduresContainer>
                <CheckBoxContainer htmlFor="chemotherapy">
                  <strong>Quimioterapia</strong>
                  <input
                    style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                    }}
                    id="chemotherapy"
                    type="checkbox"
                    checked={checkinPatient.chemotherapy}
                    onChange={event => {
                      setCheckinPatient({
                        ...checkinPatient,
                        chemotherapy: event.target.checked,
                      });
                    }}
                  />
                  <span></span>
                </CheckBoxContainer>
                <CheckBoxContainer htmlFor="radiotherapy">
                  <strong>Radioterapia</strong>
                  <input
                    style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                    }}
                    id="radiotherapy"
                    type="checkbox"
                    checked={checkinPatient.radiotherapy}
                    onChange={event => {
                      setCheckinPatient({
                        ...checkinPatient,
                        radiotherapy: event.target.checked,
                      });
                    }}
                  />
                  <span></span>
                </CheckBoxContainer>
                <CheckBoxContainer htmlFor="surgery">
                  <strong>Cirurgia</strong>
                  <input
                    style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                    }}
                    id="surgery"
                    type="checkbox"
                    checked={checkinPatient.surgery}
                    onChange={event => {
                      setCheckinPatient({
                        ...checkinPatient,
                        surgery: event.target.checked,
                      });
                    }}
                  />
                  <span></span>
                </CheckBoxContainer>
                <CheckBoxContainer htmlFor="appointment">
                  <strong>Consulta</strong>
                  <input
                    style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                    }}
                    id="appointment"
                    type="checkbox"
                    checked={checkinPatient.appointment}
                    onChange={event => {
                      setCheckinPatient({
                        ...checkinPatient,
                        appointment: event.target.checked,
                      });
                    }}
                  />
                  <span></span>
                </CheckBoxContainer>
                <CheckBoxContainer htmlFor="exams">
                  <strong>Exames</strong>
                  <input
                    style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                    }}
                    id="exams"
                    type="checkbox"
                    checked={checkinPatient.exams}
                    onChange={event => {
                      setCheckinPatient({
                        ...checkinPatient,
                        exams: event.target.checked,
                      });
                    }}
                  />
                  <span></span>
                </CheckBoxContainer>
                <CheckBoxContainer htmlFor="other">
                  <strong>Outro</strong>
                  <input
                    style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                    }}
                    id="other"
                    type="checkbox"
                    checked={checkinPatient.other}
                    onChange={event => {
                      setCheckinPatient({
                        ...checkinPatient,
                        other: event.target.checked,
                      });
                    }}
                  />
                  <span></span>
                </CheckBoxContainer>
              </MedicalProceduresContainer>
            </FieldSet>
            <FieldSet>
              <legend>
                <strong>Outras informações</strong>
              </legend>
            </FieldSet>
            <FieldContainer>
              <label htmlFor="ca_number">Nº do CA</label>
              <input
                id="ca_number"
                value={checkinPatient.ca_number || ''}
                onChange={event => {
                  setCheckinPatient({
                    ...checkinPatient,
                    ca_number: event.target.value,
                  });
                }}
              />
            </FieldContainer>
            <CheckBoxContainer htmlFor="social_vacancy">
              <strong>Vaga social</strong>
              <input
                id="social_vacancy"
                type="checkbox"
                checked={checkinPatient.social_vacancy || false}
                onChange={event => {
                  setCheckinPatient({
                    ...checkinPatient,
                    social_vacancy: event.target.checked,
                  });
                }}
              />
              <span></span>
            </CheckBoxContainer>
            <SearchForm>
              <input
                placeholder="Acompanhante"
                name="filter"
                value={searchCompanionInput || ''}
                onChange={event => {
                  setSearchCompanionInput(event.target.value);
                  setSelectedCompanion(null);
                }}
                autoComplete="off"
              />
              <SelectContainer
                style={{
                  display: allCompanions.length !== 0 ? 'block' : 'none',
                }}
              >
                {allCompanions &&
                  allCompanions.map(person => (
                    <SelectPersonItem
                      person={person}
                      key={person.id}
                      handleClick={() => handleSelectCompanionClick(person)}
                    />
                  ))}
              </SelectContainer>
            </SearchForm>
            <FieldContainer>
              <label htmlFor="companion_name">Nome do acompanhante</label>
              <input
                style={{ color: '#999' }}
                id="companion_name"
                type="text"
                name="companion_name"
                value={selectedCompanion ? selectedCompanion.name : ''}
                placeholder="Nome do acompanhante"
                autoComplete="off"
                disabled
              />
            </FieldContainer>
            <ConfirmButton text={'Atualizar checkin'} />
          </RegisterUpdateForm>
        </>
      )}
    </Container>
  );
};

export default CheckInUpdate;
