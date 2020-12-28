import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

import Header from '../../../components/Header';

import { useToast } from '../../../hooks/toast';

import api from '../../../services/api';

import { Container, InputSelect } from './styles';
import FieldContainer from '../../../components/FieldContainer';
import FieldSet from '../../../components/FieldSet';
import ConfirmButton from '../../../components/ConfirmButton';
import RegisterUpdateForm from '../../../components/RegisterUpdateForm';

interface LooseObject {
  [key: string]: string; // if string, email: '' not null
}

const PersonCreate: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();

  const stateChoices = [
    { name: 'São Paulo', abbreviation: 'SP' },
    { name: 'Paraná', abbreviation: 'PR' },
    { name: 'Santa Catarina', abbreviation: 'SC' },
    { name: 'Rio Grande do Sul', abbreviation: 'RS' },
    { name: 'Mato Grosso do Sul', abbreviation: 'MS' },
    { name: 'Rondônia', abbreviation: 'RO' },
    { name: 'Acre', abbreviation: 'AC' },
    { name: 'Amazonas', abbreviation: 'AM' },
    { name: 'Roraima', abbreviation: 'RR' },
    { name: 'Pará', abbreviation: 'PA' },
    { name: 'Amapá', abbreviation: 'AP' },
    { name: 'Tocantins', abbreviation: 'TO' },
    { name: 'Maranhão', abbreviation: 'MA' },
    { name: 'Rio Grande do Norte', abbreviation: 'RN' },
    { name: 'Paraíba', abbreviation: 'PB' },
    { name: 'Pernambuco', abbreviation: 'PE' },
    { name: 'Alagoas', abbreviation: 'AL' },
    { name: 'Sergipe', abbreviation: 'SE' },
    { name: 'Bahia', abbreviation: 'BA' },
    { name: 'Minas Gerais', abbreviation: 'MG' },
    { name: 'Rio de Janeiro', abbreviation: 'RJ' },
    { name: 'Mato Grosso', abbreviation: 'MT' },
    { name: 'Goiás', abbreviation: 'GO' },
    { name: 'Distrito Federal', abbreviation: 'DF' },
    { name: 'Piauí', abbreviation: 'PI' },
    { name: 'Ceará', abbreviation: 'CE' },
    { name: 'Espírito Santo', abbreviation: 'ES' },
  ];

  const [name, setName] = useState('');
  const [mother_name, setMotherName] = useState('');
  /* const [born_date, setBornDate] = useState(''); */
  const [email, setEmail] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [rg_ssp, setRgSsp] = useState('');
  const [selectedUf, setSelectedUf] = useState('');
  const [address_line_1, setAddressLine1] = useState('');
  const [address_line_2, setAddressLine2] = useState('');
  const [neighbourhood, setNeighbourhood] = useState('');
  const [city, setCity] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [selectedResidenceType, setSelectedResidenceType] = useState('');
  const [ddd_private_phone, setDddPrivatePhone] = useState('');
  const [private_phone, setPrivatePhone] = useState('');
  const [ddd_message_phone, setDddMessagePhone] = useState('');
  const [message_phone, setMessagePhone] = useState('');

  async function handleSubmit(event: FormEvent): Promise<void> {
    event.preventDefault();

    const data: LooseObject = {};

    data.name = name;

    if (mother_name) data.mother_name = mother_name;
    if (cpf) data.cpf = cpf.replace(/[^0-9]/g, '');
    if (rg) data.rg = rg;
    if (rg_ssp) data.rg_ssp = rg_ssp;
    if (email) data.email = email;
    if (address_line_1) data.address_line_1 = address_line_1;
    if (address_line_2) data.address_line_2 = address_line_2;
    if (neighbourhood) data.neighbourhood = neighbourhood;
    if (city) data.city = city;
    if (postal_code) data.postal_code = postal_code.replace(/[^0-9]/g, '');
    if (ddd_message_phone) data.ddd_message_phone = ddd_message_phone;
    if (ddd_private_phone) data.ddd_private_phone = ddd_private_phone;
    if (message_phone) data.message_phone = message_phone;
    if (private_phone) data.private_phone = private_phone;
    if (selectedGender !== '0' && selectedGender) data.gender = selectedGender;
    if (selectedUf !== '0' && selectedUf) data.state = selectedUf;

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
            <FiChevronDown />
          </legend>

          <FieldContainer>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              value={name}
              onChange={event => {
                setName(event.target.value);
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="mother_name">Nome da mãe</label>
            <input
              id="mother_name"
              value={mother_name}
              onChange={event => {
                setMotherName(event.target.value);
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="gender">Sexo</label>
            <InputSelect
              id="gender"
              value={selectedGender}
              disabled={selectedGender === '0'}
              onChange={event => {
                setSelectedGender(event.target.value);
              }}
            >
              <option value="0">Selecione sexo</option>
              <option value={'F'}>Feminino</option>
              <option value={'M'}>Masculino</option>
              <option value={'O'}>Outro</option>
            </InputSelect>
          </FieldContainer>
        </FieldSet>{' '}
        <FieldSet>
          <legend>
            <strong>Documentos</strong>
            <FiChevronDown />
          </legend>
          <FieldContainer>
            <label htmlFor="rg">RG</label>
            <input
              id="rg"
              value={rg}
              onChange={event => {
                setRg(event.target.value);
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="rg_ssp">SSP</label>
            <input
              id="rg_ssp"
              value={rg_ssp}
              onChange={event => {
                setRgSsp(event.target.value);
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              value={cpf}
              onChange={event => {
                setCpf(event.target.value.replace(/^\D+/g, ''));
              }}
            />
          </FieldContainer>
        </FieldSet>
        <FieldSet>
          <legend>
            <strong>Endereço</strong>
            <FiChevronDown />
          </legend>

          <FieldContainer>
            <label htmlFor="address_line_1">Rua, número, quadra ...</label>
            <input
              id="address_line_1"
              value={address_line_1}
              onChange={event => {
                setAddressLine1(event.target.value);
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="address_line_2">Complemento</label>
            <input
              id="address_line_2"
              value={address_line_2}
              onChange={event => {
                setAddressLine2(event.target.value);
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="neighbourhood">Bairro</label>
            <input
              id="neighbourhood"
              value={neighbourhood}
              onChange={event => {
                setNeighbourhood(event.target.value);
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="residence_type">Tipo de residência</label>
            <InputSelect
              id="residence_type"
              value={selectedResidenceType}
              disabled={selectedResidenceType === '0'}
              onChange={event => {
                setSelectedResidenceType(event.target.value);
              }}
            >
              <option value="0">Selecione tipo</option>
              <option value={'urban'}>Urbana</option>
              <option value={'rural'}>Rural</option>
            </InputSelect>
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="city">Cidade</label>
            <input
              id="city"
              value={city}
              onChange={event => {
                setCity(event.target.value);
              }}
            />
          </FieldContainer>

          <FieldContainer>
            <label htmlFor="state">Estado</label>
            <InputSelect
              disabled={selectedUf === '0'}
              id="state"
              onChange={event => setSelectedUf(event.target.value)}
              value={selectedUf}
            >
              <option value="0">Selecione uma UF</option>
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
              value={postal_code}
              onChange={event => {
                setPostalCode(event.target.value);
              }}
            />
          </FieldContainer>
        </FieldSet>{' '}
        <FieldSet>
          <legend>
            <strong>Contatos</strong>
            <FiChevronDown />
          </legend>
          <FieldContainer>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
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
              value={ddd_private_phone}
              onChange={event => {
                setDddPrivatePhone(event.target.value);
              }}
            />
          </FieldContainer>
          <FieldContainer
            containerStyle={{ display: 'inline-block', width: '60%' }}
          >
            <label htmlFor="private_phone">Telefone pessoal</label>
            <input
              id="private_phone"
              value={private_phone}
              onChange={event => {
                setPrivatePhone(event.target.value);
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
              value={ddd_message_phone}
              onChange={event => {
                setDddMessagePhone(event.target.value);
              }}
            />
          </FieldContainer>
          <FieldContainer
            containerStyle={{ display: 'inline-block', width: '60%' }}
          >
            <label htmlFor="message_phone">Telefone para mensagem</label>
            <input
              id="message_phone"
              value={message_phone}
              onChange={event => {
                setMessagePhone(event.target.value);
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
