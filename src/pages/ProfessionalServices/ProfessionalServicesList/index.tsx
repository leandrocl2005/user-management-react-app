import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
  CardHeader,
  CardBody,
  ProfessionalServicesItem,
} from './styles';

import Header from '../../../components/Header';
import GalleryContainer from '../../../components/GalleryContainer';
import Avatar from '../../../components/Avatar';
import Nav from '../../../components/Nav';
import SearchForm from '../../../components/SearchForm';

import api from '../../../services/api';

import { ProfessionalServiceListData } from '../types';
import { useToast } from '../../../hooks/toast';

const ProfessionalServicesList: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();

  const [searchInput, setSearchInput] = useState('');
  const [searchSubmit, setSearchSubmit] = useState('');
  const [total, setTotal] = useState(0);

  const [professionalServices, setProfessionalServices] = useState<
    ProfessionalServiceListData[]
  >([]);

  useEffect(() => {
    async function loadProfessionalServices(): Promise<void> {
      try {
        let url = '/api/v1/professional_services/?';
        url += `search=${searchSubmit}`;
        const response = await api.get(url);
        setProfessionalServices(response.data.results);
        setTotal(response.data.count);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro no servidor',
          description: 'Servidor offline. Tente mais tarde!',
        });
      }
    }
    loadProfessionalServices();
  }, [addToast, searchSubmit]);

  const handleCardClick = (id: number): void => {
    history.push(`/professional-services/${id}`);
  };

  const handleSearchSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setSearchSubmit(searchInput);
  };

  return (
    <Container>
      <Header />

      <Nav total={total} pathCreate={'/create-professional-services'}>
        <SearchForm onSubmit={handleSearchSubmit}>
          <input
            placeholder="Buscar profissional"
            name="filter"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
          />
        </SearchForm>
      </Nav>
      <GalleryContainer>
        {professionalServices.map(professionalService => (
          <ProfessionalServicesItem
            onClick={() => handleCardClick(professionalService.id)}
            key={professionalService.id}
          >
            <CardHeader>
              <Avatar src="" alt="" />
              <div>
                <h3>{professionalService.title}</h3>
                <p>Por {professionalService.professional_name}</p>
              </div>
            </CardHeader>
            <CardBody>
              <h4>Descrição</h4>
              <p>{professionalService.description.slice(0, 80)}...</p>
              <p>Data do serviço: {professionalService.formatted_created_at}</p>
            </CardBody>
          </ProfessionalServicesItem>
        ))}
      </GalleryContainer>
    </Container>
  );
};

export default ProfessionalServicesList;
