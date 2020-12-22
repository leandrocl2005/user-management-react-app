import React, { useEffect, useState } from 'react';

import {
  Container,
  CardHeader,
  ProfessionalServicesItem,
  CardBody,
} from './styles';

import Header from '../../../components/Header';
import GalleryContainer from '../../../components/GalleryContainer';
import Avatar from '../../../components/Avatar';
import Nav from '../../../components/Nav';
import SearchForm from '../../../components/SearchForm';

import api from '../../../services/api';

interface ProfessionalService {
  id: number;
  professional_name: string;
  professional: number;
  title: string;
  description: string;
}

const ProfessionalServicesList: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [professionalServices, setProfessionalServices] = useState<
    ProfessionalService[]
  >([]);

  useEffect(() => {
    async function loadProfessionalServices(): Promise<void> {
      const response = await api.get('/api/v1/professional_services/');
      setProfessionalServices(response.data.results);
    }
    loadProfessionalServices();
  }, []);

  return (
    <Container>
      <Header />

      <Nav total={100} pathCreate={'/create-professional-services'}>
        <SearchForm>
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
          <ProfessionalServicesItem key={professionalService.id}>
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
            </CardBody>
          </ProfessionalServicesItem>
        ))}
      </GalleryContainer>
    </Container>
  );
};

export default ProfessionalServicesList;
