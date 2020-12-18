import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import Header from '../../../components/Header';
import { useToast } from '../../../hooks/toast';
import api from '../../../services/api';

import {
  Container,
  Nav,
  SearchInput,
  SelectContainer,
  SelectItem,
  Avatar,
  SelectTextContainer,
  Form,
  CheckBoxContainer,
  MedicalProceduresContainer,
} from './styles';

interface Person {
  id: number;
  name: string;
  formatted_born_date: string;
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
        <SearchInput onSubmit={event => event.preventDefault()}>
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
          <button type="button">
            <FiSearch
              size={16}
              style={{
                margin: '8px',
              }}
            />
          </button>
          <SelectContainer
            style={{
              display: allPeople.length !== 0 ? 'block' : 'none',
            }}
          >
            {allPeople &&
              allPeople.map(person => (
                <SelectItem
                  key={person.id}
                  onClick={() => handleSelectPersonClick(person)}
                >
                  <Avatar>
                    <img
                      src={`https://i.pravatar.cc/250/img=${person.id}`}
                      alt={person.name}
                    />
                  </Avatar>
                  <SelectTextContainer>
                    <h3>{person.name}</h3>
                    <p>Dt. Nasc.: {person.formatted_born_date}</p>
                  </SelectTextContainer>
                </SelectItem>
              ))}
          </SelectContainer>
        </SearchInput>
      </Nav>
      {selectedPerson && (
        <Form>
          <fieldset>
            <legend>
              <strong>Identificação do checkin</strong>
              <FiChevronDown />
            </legend>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={selectedPerson.name} disabled={true} />
            </div>

            <div className="input-block">
              <label htmlFor="reason">Tipo do checkin</label>
              <select
                id="reason"
                value={selectedReason}
                disabled={selectedReason === '0'}
                onChange={event => {
                  setSelectedReason(event.target.value);
                }}
              >
                <option value="0">Selecione o tipo de checkin</option>
                <option value={'patient'}>Paciente</option>
                <option value={'companion'}>Acompanhante</option>
                <option value={'professional'}>Profissional</option>
                <option value={'voluntary'}>Voluntário</option>
                <option value={'visitor'}>Visitante</option>
                <option value={'other'}>Outro</option>
              </select>
            </div>
          </fieldset>
          {selectedReason === 'patient' && (
            <fieldset>
              <legend>
                <strong>Acompanhante</strong>
                <FiChevronDown />
              </legend>
              {!selectedCompanion && (
                <SearchInput onSubmit={event => event.preventDefault()}>
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
                  <button type="button">
                    <FiSearch
                      size={16}
                      style={{
                        margin: '8px',
                      }}
                    />
                  </button>
                  <SelectContainer
                    style={{
                      display: allCompanions.length !== 0 ? 'block' : 'none',
                    }}
                  >
                    {allCompanions &&
                      allCompanions.map(companion => (
                        <SelectItem
                          key={companion.id}
                          onClick={() => handleSelectCompanionClick(companion)}
                        >
                          <Avatar>
                            <img
                              src={`https://i.pravatar.cc/250/img=${companion.id}`}
                              alt={companion.name}
                            />
                          </Avatar>
                          <SelectTextContainer>
                            <h3>{companion.name}</h3>
                            <p>Dt. Nasc.: {companion.formatted_born_date}</p>
                          </SelectTextContainer>
                        </SelectItem>
                      ))}
                  </SelectContainer>
                </SearchInput>
              )}
              {selectedCompanion && (
                <div className="input-block">
                  <input
                    id="companion_name"
                    value={selectedCompanion.name}
                    disabled={true}
                  />
                </div>
              )}
            </fieldset>
          )}
          {selectedCompanion && selectedReason === 'patient' && (
            <fieldset>
              <legend>
                <strong>Informações do paciente</strong>
                <FiChevronDown />
              </legend>
              <div className="input-block">
                <label htmlFor="ca_number">Nº do CA</label>
                <input
                  id="ca_number"
                  value={ca_number}
                  onChange={event => {
                    setCaNumber(event.target.value);
                  }}
                />
              </div>
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

              <div className="input-block">
                <label htmlFor="observation">Observação</label>
                <textarea
                  id="observation"
                  value={observation}
                  onChange={event => {
                    setObservation(event.target.value);
                  }}
                />
              </div>
            </fieldset>
          )}
        </Form>
      )}
    </Container>
  );
};

export default CheckInCreate;
