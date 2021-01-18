import React, { FormEvent, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import Header from '../../../components/Header';
import Nav from '../../../components/Nav';
import FilterButton from '../../../components/FilterButton';
import SearchForm from '../../../components/SearchForm';
import SelectPersonItem from '../../../components/SelectPersonItem';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import FieldContainer from '../../../components/FieldContainer';
import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';

import api from '../../../services/api';

import { useToast } from '../../../hooks/toast';

import { CheckinCreateNoPatientData, Person } from '../types';

import { Container, InputSelect, SelectContainer } from './styles';

const reasonOptions = [
  { value: 'companion', label: 'Acompanhante' },
  { value: 'professional', label: 'Profissional' },
  { value: 'voluntary', label: 'Voluntário' },
  { value: 'visitor', label: 'Visitante' },
  { value: 'other', label: 'Outro' },
];

interface ReasonOption {
  value: string;
  label: string;
}

const CheckInCreate: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const [isPatient, setIsPatient] = useState(false);

  // Select List, Input and Selected
  const [searchPersonInput, setSearchPersonInput] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [allPeople, setAllPeople] = useState<Person[]>([]);

  const [checkinNoPatient, setCheckinNoPatient] = useState<
    CheckinCreateNoPatientData
  >({
    person: 0,
    reason: '0',
  });

  // Load people on input search submit
  useEffect(() => {
    async function loadPeople(): Promise<void> {
      try {
        let url = '/api/v1/people/?limit=4';
        if (searchPersonInput) {
          url += `&search=${searchPersonInput}`;
          const response = await api.get(url);
          setAllPeople(response.data.results);
        } else {
          setAllPeople([]);
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Servidor offline. Tente mais tarde!',
        });
      }
    }
    loadPeople();
  }, [addToast, searchPersonInput]);

  // handle person select
  const handleSelectPersonClick = (person: Person): void => {
    setSelectedPerson(person);
    setSearchPersonInput('');
    setCheckinNoPatient({
      ...checkinNoPatient,
      person: person.id,
    });
  };

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
        <SearchForm
          containerStyle={{ position: 'relative' }}
          onSubmit={event => event.preventDefault()}
        >
          <input
            placeholder="Buscar pessoa"
            name="filter"
            value={searchPersonInput}
            onChange={event => {
              setSearchPersonInput(event.target.value);
              setSelectedPerson(null);
            }}
            autoComplete="off"
          />
          <SelectContainer
            style={{
              display: allPeople.length !== 0 ? 'block' : 'none',
            }}
          >
            {allPeople &&
              allPeople.map(person => (
                <SelectPersonItem
                  person={person}
                  key={person.id}
                  handleClick={() => handleSelectPersonClick(person)}
                />
              ))}
          </SelectContainer>
        </SearchForm>
      </Nav>

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
    </Container>
  );
};

export default CheckInCreate;

/* import React, { useEffect, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import FieldContainer from '../../../components/FieldContainer';
import FieldSet from '../../../components/FieldSet';
import Header from '../../../components/Header';
import Nav from '../../../components/Nav';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';
import SearchForm from '../../../components/SearchForm';
import SelectPersonItem from '../../../components/SelectPersonItem';

import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';

import {
  Container,
  InputSelect,
  SelectContainer,
  CheckBoxContainer,
  MedicalProceduresContainer,
} from './styles';

interface Person {
  id: number;
  name: string;
  formatted_born_date: string;
  avatar: string;
}

const CheckInCreate: React.FC = () => {
  const [searchPersonInput, setSearchPersonInput] = useState('');
  const [allPeople, setAllPeople] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [searchCompanionInput, setSearchCompanionInput] = useState('');
  const [allCompanions, setAllCompanions] = useState<Person[]>([]);
  const [selectedCompanion, setSelectedCompanion] = useState<Person | null>(
    null,
  );
  const [selectedReason, setSelectedReason] = useState('');
  const [appointment, setAppointment] = useState(false);
  const [social_vacancy, setSocialVacancy] = useState(false);
  const [ca_number, setCaNumber] = useState('');
  const [observation, setObservation] = useState('');
  const [other, setOther] = useState(false);
  const [surgery, setSurgery] = useState(false);
  const [chemotherapy, setChemotherapy] = useState(false);
  const [radiotherapy, setRadiotherapy] = useState(false);
  const [exams, setExams] = useState(false);

  const { addToast } = useToast();

  useEffect(() => {
    async function loadPeople(): Promise<void> {
      try {
        let url = '/api/v1/people/?limit=4';
        if (searchPersonInput) {
          url += `&search=${searchPersonInput}`;
          const response = await api.get(url);
          setAllPeople(response.data.results);
        } else {
          setAllPeople([]);
        }
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Servidor offline. Tente mais tarde!',
        });
      }
    }
    loadPeople();
  }, [addToast, searchPersonInput]);

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

  function handleSelectPersonClick(person: Person): void {
    setSelectedPerson(person);
    setSearchPersonInput('');
  }

  function handleSelectCompanionClick(companion: Person): void {
    setSelectedCompanion(companion);
    setSearchCompanionInput('');
  }

  return (
    <Container>
      <Header />
      <Nav>
        <SearchForm
          containerStyle={{ position: 'relative' }}
          onSubmit={event => event.preventDefault()}
        >
          <input
            placeholder="Buscar por nome"
            name="filter"
            value={searchPersonInput}
            onChange={event => {
              setSearchPersonInput(event.target.value);
              setSelectedPerson(null);
              setSelectedCompanion(null);
            }}
            autoComplete="off"
          />
          <SelectContainer
            style={{
              display: allPeople.length !== 0 ? 'block' : 'none',
            }}
          >
            {allPeople &&
              allPeople.map(person => (
                <SelectPersonItem
                  person={person}
                  key={person.id}
                  handleClick={() => handleSelectPersonClick(person)}
                />
              ))}
          </SelectContainer>
        </SearchForm>
      </Nav>
      {selectedPerson && (
        <RegisterUpdateForm>
          <FieldSet>
            <legend>
              <strong>Identificação do checkin</strong>
              <FiChevronDown />
            </legend>

            <FieldContainer>
              <label htmlFor="name">Nome</label>
              <input id="name" value={selectedPerson.name} disabled={true} />
            </FieldContainer>


          </FieldSet>
          {selectedReason === 'patient' && (
            <FieldSet>
              <legend>
                <strong>Acompanhante</strong>
                <FiChevronDown />
              </legend>
              {!selectedCompanion && (
                <SearchForm
                  containerStyle={{ position: 'relative' }}
                  onSubmit={event => event.preventDefault()}
                >
                  {' '}
                  <input
                    placeholder="Acompanhante"
                    name="filter"
                    value={searchCompanionInput}
                    onChange={event => {
                      setSearchCompanionInput(event.target.value);
                      setSelectedCompanion(null);
                    }}
                    autoComplete="off"
                  />
                  <SelectContainer
                    style={{
                      display: allCompanions.length !== 0 ? 'block' : 'none',
                      overflow: 'hidden',
                    }}
                  >
                    {allCompanions &&
                      allCompanions.map(companion => (
                        <SelectPersonItem
                          key={companion.id}
                          handleClick={() =>
                            handleSelectCompanionClick(companion)
                          }
                          person={companion}
                        />
                      ))}
                  </SelectContainer>
                </SearchForm>
              )}
              {selectedCompanion && (
                <FieldContainer>
                  <input
                    id="companion_name"
                    value={selectedCompanion.name}
                    disabled={true}
                  />
                </FieldContainer>
              )}
            </FieldSet>
          )}
          {selectedCompanion && selectedReason === 'patient' && (
            <FieldSet>
              <legend>
                <strong>Informações do paciente</strong>
                <FiChevronDown />
              </legend>
              <FieldContainer>
                <label htmlFor="ca_number">Nº do CA</label>
                <input
                  id="ca_number"
                  value={ca_number}
                  onChange={event => {
                    setCaNumber(event.target.value);
                  }}
                />
              </FieldContainer>
              <CheckBoxContainer htmlFor="social_vacancy">
                <strong>Vaga social</strong>
                <input
                  id="social_vacancy"
                  type="checkbox"
                  checked={social_vacancy}
                  onChange={event => {
                    setSocialVacancy(event.target.checked);
                  }}
                />
                <span></span>
              </CheckBoxContainer>

              <p
                style={{
                  display: 'flex',
                  color: '#777',
                  marginBottom: '8px',
                  lineHeight: '24px',
                  fontSize: '16px',
                }}
              >
                Procedimentos médicos
              </p>

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
                    checked={chemotherapy}
                    onChange={event => {
                      setChemotherapy(event.target.checked);
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
                    checked={radiotherapy}
                    onChange={event => {
                      setRadiotherapy(event.target.checked);
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
                    checked={surgery}
                    onChange={event => {
                      setSurgery(event.target.checked);
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
                    checked={appointment}
                    onChange={event => {
                      setAppointment(event.target.checked);
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
                    checked={exams}
                    onChange={event => {
                      setExams(event.target.checked);
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
                    checked={other}
                    onChange={event => {
                      setOther(event.target.checked);
                    }}
                  />
                  <span></span>
                </CheckBoxContainer>
              </MedicalProceduresContainer>

              <FieldContainer>
                <label htmlFor="observation">Observação</label>
                <textarea
                  id="observation"
                  value={observation}
                  onChange={event => {
                    setObservation(event.target.value);
                  }}
                />
              </FieldContainer>
            </FieldSet>
          )}
        </RegisterUpdateForm>
      )}
    </Container>
  );
};

export default CheckInCreate; */
