import React, { useCallback, useRef, useState, useEffect } from 'react';
import { FiMail, FiUser, FiHome, FiPhone, FiCreditCard } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import { FaCity, FaEnvelopeOpenText, FaFemale } from 'react-icons/fa';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content } from './styles';
import Header from '../../components/Header';

interface ProfileFormData {
    name: string;
    email: string;
    mother_name: string;
    cpf: string;
    password: number;
    address_line_1: string;
    address_line_2: string;
    postal_code: string;
    city: string;
    phone: string;
}

interface Person {
    id: number;
    name: string;
    mother_name: string;
    cpf: string;
    formatted_born_date: string;
    email: string;
    address_line_1: string;
    address_line_2: string;
    city: string;
    state: string;
    postal_code: string;
    ddd_private_phone: string;
    private_phone: string;
}

interface PersonParams {
    id: string;
}

const PeopleUpdate: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const [person, setPerson] = useState<Person | null>(null);
    const { id } = useParams<PersonParams>();

    useEffect(() => {
        async function loadPerson(): Promise<void> {
            try {
                const response = await api.get(`api/v1/people/${id}/`);
                setPerson(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        loadPerson();
    }, [id]);

    const handleSubmit = useCallback(
        async (data: ProfileFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const {
                    name,
                    email,
                    mother_name,
                    cpf,
                    phone,
                    address_line_1,
                    address_line_2,
                    postal_code,
                } = data;

                const formData = {
                    id,
                    name,
                    password:
                        '$2a$10$LmEmqCsivO./7W7zE5AWU.Dj.9u0X83rXuCjoEeU8gkJR1upDzes2',
                    email,
                    mother_name,
                    cpf,
                    address_line_1,
                    address_line_2,
                    postal_code,
                };

                await api.put('/users', formData);

                addToast({
                    type: 'success',
                    title: 'Usuário atualizado com sucesso!',
                    description:
                        'Suas informações do perfil foram atualizadas com sucesso!',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);

                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro na atualização',
                    description: 'Ocorreu um erro ao atualizar perfil, tente novamente.',
                });
            }
        },
        [addToast],
    );

    return (
        <Container>
            <Header />

            <Content>
                <Form
                    ref={formRef}
                    initialData={{
                        name: person ? person.name : '',
                        email: person ? person.email : '',
                        cpf: person ? person.cpf : '',
                        mother_name: person ? person.mother_name : '',
                        street: person ? person.address_line_1 : '',
                        suite: person ? person.address_line_2 : '',
                        zipcode: person ? person.postal_code : '',
                        city: person ? person.city : '',
                    }}
                    onSubmit={handleSubmit}
                >
                    <h3>Identificação</h3>
                    <Input name="name" icon={FiUser} placeholder="Nome" />

                    <Input name="cpf" icon={FiCreditCard} placeholder="CPF" />
                    <Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="mother_name" icon={FaFemale} placeholder="Nome da mãe" />

                    <h3 style={{ marginTop: '24px' }}>Endereço</h3>
                    <Input name="address_line_1" icon={FiHome} placeholder="Endereço" />
                    <Input
                        name="address_line_2"
                        icon={FiHome}
                        placeholder="Complemento"
                    />
                    <Input
                        name="postal_code"
                        icon={FaEnvelopeOpenText}
                        placeholder="CEP"
                    />
                    <Input name="city" icon={FaCity} placeholder="Cidade" />

                    <Button type="submit">Confirmar mudanças</Button>
                </Form>
            </Content>
        </Container>
    );
};

export default PeopleUpdate;
