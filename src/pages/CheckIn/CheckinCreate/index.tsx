import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../../components/Header';
import Nav from '../../../components/Nav';
import FilterButton from '../../../components/FilterButton';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import FieldContainer from '../../../components/FieldContainer';
import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';
import DynamicSearchForm from '../../../components/DynamicSearchForm';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import {
  CheckinCreateNoPatientData,
  CheckinCreatePatientData,
  Person,
} from '../types';

import {
  CheckBoxContainer,
  Container,
  InputSelect,
  MedicalProceduresContainer,
} from './styles';

const reasonOptions = [
  { value: 'companion', label: 'Acompanhante' },
  { value: 'professional', label: 'Profissional' },
  { value: 'voluntary', label: 'Voluntário' },
  { value: 'visitor', label: 'Visitante' },
  { value: 'other', label: 'Outro' },
];

const CheckInCreate: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const [isPatient, setIsPatient] = useState(true);
  const [formVisibility, setFormVisibility] = useState(false);

  // Select List, Input and Selected
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [selectedCompanion, setSelectedCompanion] = useState<Person | null>(
    null,
  );

  const [checkinNoPatient, setCheckinNoPatient] = useState<
    CheckinCreateNoPatientData
  >({
    person: 0,
    reason: '0',
  });

  const [checkinPatient, setCheckinPatient] = useState<
    CheckinCreatePatientData
  >({
    person: 0,
    companion: 0,
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

  // handle person select
  const handleSelectPersonClick = (person: Person): void => {
    setSelectedPerson(person);
    setCheckinNoPatient({
      ...checkinNoPatient,
      person: person.id,
    });
    setCheckinPatient({
      ...checkinPatient,
      person: person.id,
    });
    setFormVisibility(true);
  };

  // handle companion select
  const handleSelectCompanionClick = (person: Person): void => {
    setSelectedCompanion(person);
    setCheckinPatient({
      ...checkinPatient,
      companion: person.id,
    });
    setFormVisibility(true);
  };

  async function handleSubmitPatient(event: FormEvent): Promise<void> {
    event.preventDefault();

    try {
      await api.post(`/api/v1/checkins/`, checkinPatient);

      history.push('/checkins');

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

  // Register new home service and redirect to home service page
  async function handleSubmitNoPatient(event: FormEvent): Promise<void> {
    event.preventDefault();

    try {
      await api.post(`/api/v1/checkins/`, checkinNoPatient);

      history.push('/checkins');

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
      <Nav>
        <FilterButton
          color={isPatient ? '#84c4b7' : '#414941'}
          text={'Paciente'}
          onClick={() => setIsPatient(true)}
        />
        <FilterButton
          color={!isPatient ? '#84c4b7' : '#414941'}
          text={'Não é paciente'}
          onClick={() => setIsPatient(false)}
        />
      </Nav>

      <Nav>
        <DynamicSearchForm handleSelect={handleSelectPersonClick} />
      </Nav>

      {!isPatient && formVisibility && (
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
                  value={selectedPerson ? selectedPerson.name : ''}
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
            <ConfirmButton text={'Fazer checkin'} />
          </RegisterUpdateForm>
        </>
      )}

      {isPatient && formVisibility && (
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
                  value={selectedPerson ? selectedPerson.name : ''}
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
                value={checkinPatient.ca_number}
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
                checked={checkinPatient.social_vacancy}
                onChange={event => {
                  setCheckinPatient({
                    ...checkinPatient,
                    social_vacancy: event.target.checked,
                  });
                }}
              />
              <span></span>
            </CheckBoxContainer>
            <DynamicSearchForm handleSelect={handleSelectCompanionClick} />
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

            <ConfirmButton text={'Fazer checkin'} />
          </RegisterUpdateForm>
        </>
      )}
    </Container>
  );
};

export default CheckInCreate;
