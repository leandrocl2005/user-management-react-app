import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import { Container, InputSelect } from './styles';

import FieldContainer from '../../../components/FieldContainer';
import Header from '../../../components/Header';
import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';

import { PersonCreateData } from '../types';

const stateChoices = [
  { name: 'Acre', abbreviation: 'AC' },
  { name: 'Alagoas', abbreviation: 'AL' },
  { name: 'Amapá', abbreviation: 'AP' },
  { name: 'Amazonas', abbreviation: 'AM' },
  { name: 'Bahia', abbreviation: 'BA' },
  { name: 'Ceará', abbreviation: 'CE' },
  { name: 'Distrito Federal', abbreviation: 'DF' },
  { name: 'Espírito Santo', abbreviation: 'ES' },
  { name: 'Goiás', abbreviation: 'GO' },
  { name: 'Maranhão', abbreviation: 'MA' },
  { name: 'Mato Grosso', abbreviation: 'MT' },
  { name: 'Mato Grosso do Sul', abbreviation: 'MS' },
  { name: 'Minas Gerais', abbreviation: 'MG' },
  { name: 'Pará', abbreviation: 'PA' },
  { name: 'Paraíba', abbreviation: 'PB' },
  { name: 'Paraná', abbreviation: 'PR' },
  { name: 'Pernambuco', abbreviation: 'PE' },
  { name: 'Piauí', abbreviation: 'PI' },
  { name: 'Roraima', abbreviation: 'RR' },
  { name: 'Rio Grande do Norte', abbreviation: 'RN' },
  { name: 'Rio Grande do Sul', abbreviation: 'RS' },
  { name: 'Rio de Janeiro', abbreviation: 'RJ' },
  { name: 'Rondônia', abbreviation: 'RO' },
  { name: 'Santa Catarina', abbreviation: 'SC' },
  { name: 'São Paulo', abbreviation: 'SP' },
  { name: 'Sergipe', abbreviation: 'SE' },
  { name: 'Tocantins', abbreviation: 'TO' },
];

const PersonCreate: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();

  // payload to create data
  const [person, setPerson] = useState<PersonCreateData>({
    name: '',
    mother_name: '',
    born_date: '1987-07-09',
    death_date: '1987-07-09',
    email: '',
    gender: '0',
    cpf: '',
    rg: '',
    rg_ssp: '0',
    state: '0',
    address_line_1: '',
    address_line_2: '',
    neighbourhood: '',
    city: '',
    postal_code: '',
    residence_type: '0',
    ddd_private_phone: '',
    private_phone: '',
    ddd_message_phone: '',
    message_phone: '',
    observation: '',
  });

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    // fix dates and cpf
    const data = {
      ...person,
    };

    if (data.gender === '0') {
      delete data.gender;
    }

    if (data.rg_ssp === '0') {
      delete data.rg_ssp;
    }

    if (data.state === '0') {
      delete data.state;
    }

    if (data.residence_type === '0') {
      delete data.residence_type;
    }

    if (data.email === '') {
      delete data.email;
    }

    if (data.cpf) {
      data.cpf = data.cpf.replace(/\D/g, '');
    } else {
      delete data.cpf;
    }

    if (data.postal_code) {
      data.postal_code = data.postal_code.replace(/\D/g, '');
    } else {
      delete data.postal_code;
    }

    if (data.ddd_message_phone === '') {
      delete data.ddd_message_phone;
    }

    if (data.message_phone) {
      data.message_phone = data.message_phone.replace(/\D/g, '');
    } else {
      delete data.message_phone;
    }

    if (data.ddd_private_phone === '') {
      delete data.ddd_private_phone;
    }

    if (data.private_phone) {
      data.private_phone = data.private_phone.replace(/\D/g, '');
    } else {
      delete data.private_phone;
    }

    try {
      // console.log(data);
      await api.post('/api/v1/people/', data);

      history.push('/people');

      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Pessoa cadastrada com sucesso!',
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
            <strong>Identificação</strong>
          </legend>

          <FieldContainer>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              value={person.name}
              onChange={event => {
                setPerson({ ...person, name: event.target.value });
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="mother_name">Nome da mãe</label>
            <input
              id="mother_name"
              value={person.mother_name}
              onChange={event => {
                setPerson({ ...person, mother_name: event.target.value });
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="gender">Sexo</label>
            <InputSelect
              id="gender"
              value={person.gender}
              onChange={event => {
                setPerson({ ...person, gender: event.target.value });
              }}
            >
              <option disabled value="0">
                Selecione...
              </option>
              <option value={'F'}>Feminino</option>
              <option value={'M'}>Masculino</option>
              <option value={'O'}>Outro</option>
            </InputSelect>
          </FieldContainer>
        </FieldSet>{' '}
        <FieldSet>
          <legend>
            <strong>Documentos</strong>
          </legend>
          <FieldContainer>
            <label htmlFor="rg">RG</label>
            <input
              id="rg"
              value={person.rg}
              onChange={event => {
                setPerson({ ...person, rg: event.target.value });
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="rg_ssp">SSP</label>
            <input
              id="rg_ssp"
              value={person.rg_ssp}
              onChange={event => {
                setPerson({ ...person, rg_ssp: event.target.value });
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              value={person.cpf}
              onChange={event => {
                setPerson({
                  ...person,
                  cpf: event.target.value,
                });
              }}
            />
          </FieldContainer>
        </FieldSet>
        <FieldSet>
          <legend>
            <strong>Endereço</strong>
          </legend>

          <FieldContainer>
            <label htmlFor="address_line_1">Rua, número, quadra ...</label>
            <input
              id="address_line_1"
              value={person.address_line_1}
              onChange={event => {
                setPerson({ ...person, address_line_1: event.target.value });
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="address_line_2">Complemento</label>
            <input
              id="address_line_2"
              value={person.address_line_2}
              onChange={event => {
                setPerson({ ...person, address_line_2: event.target.value });
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="neighbourhood">Bairro</label>
            <input
              id="neighbourhood"
              value={person.neighbourhood}
              onChange={event => {
                setPerson({ ...person, neighbourhood: event.target.value });
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="residence_type">Tipo de residência</label>
            <InputSelect
              id="residence_type"
              value={person.residence_type}
              onChange={event => {
                setPerson({
                  ...person,
                  residence_type: event.target.value,
                });
              }}
            >
              <option disabled value="0">
                Selecione...
              </option>
              <option value={'urban'}>Urbana</option>
              <option value={'rural'}>Rural</option>
            </InputSelect>
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="city">Cidade</label>
            <input
              id="city"
              value={person.city}
              onChange={event => {
                setPerson({ ...person, city: event.target.value });
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="state">Estado</label>
            <InputSelect
              id="state"
              onChange={event =>
                setPerson({ ...person, state: event.target.value })
              }
              value={person.state}
            >
              <option disabled value="0">
                Selecione...
              </option>
              {stateChoices.map(uf => (
                <option value={uf.abbreviation} key={uf.abbreviation}>
                  {uf.name}
                </option>
              ))}
            </InputSelect>
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="postal_code">CEP</label>
            <input
              id="postal_code"
              value={person.postal_code}
              onChange={event => {
                setPerson({ ...person, postal_code: event.target.value });
              }}
            />
          </FieldContainer>
        </FieldSet>{' '}
        <FieldSet>
          <legend>
            <strong>Contatos</strong>
          </legend>
          <FieldContainer>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              value={person.email}
              onChange={event => {
                setPerson({ ...person, email: event.target.value });
              }}
            />
          </FieldContainer>
          <FieldContainer
            containerStyle={{
              width: '30%',
              display: 'inline-block',
              marginRight: '10%',
            }}
          >
            <label htmlFor="ddd_private_phone">DDD</label>
            <input
              id="ddd_private_phone"
              value={person.ddd_private_phone}
              onChange={event => {
                setPerson({ ...person, ddd_private_phone: event.target.value });
              }}
            />
          </FieldContainer>
          <FieldContainer
            containerStyle={{ display: 'inline-block', width: '60%' }}
          >
            <label htmlFor="private_phone">Telefone pessoal</label>
            <input
              id="private_phone"
              value={person.private_phone}
              onChange={event => {
                setPerson({ ...person, private_phone: event.target.value });
              }}
            />
          </FieldContainer>
          <FieldContainer
            containerStyle={{
              width: '30%',
              display: 'inline-block',
              marginRight: '10%',
            }}
          >
            <label htmlFor="ddd_message_phone">DDD</label>
            <input
              id="ddd_message_phone"
              value={person.ddd_message_phone}
              onChange={event => {
                setPerson({ ...person, ddd_message_phone: event.target.value });
              }}
            />
          </FieldContainer>
          <FieldContainer
            containerStyle={{ display: 'inline-block', width: '60%' }}
          >
            <label htmlFor="message_phone">Telefone para mensagem</label>
            <input
              id="message_phone"
              value={person.message_phone}
              onChange={event => {
                setPerson({ ...person, message_phone: event.target.value });
              }}
            />
          </FieldContainer>
        </FieldSet>
        <ConfirmButton text={'Cadastrar'} />
      </RegisterUpdateForm>
    </Container>
  );
};

export default PersonCreate;
