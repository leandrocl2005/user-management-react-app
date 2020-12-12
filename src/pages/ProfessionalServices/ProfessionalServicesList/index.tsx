import React, { useEffect, useState } from 'react';

import { FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  Nav,
  SearchInput,
  ProfessionalServicesGallery,
  Avatar,
  CardHeader,
  ProfessionalServicesItem,
  CardBody,
} from './styles';
import Header from '../../../components/Header';
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

      <Nav>
        <SearchInput>
          <input
            placeholder="Buscar por profissional"
            name="filter"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
          />
          <button type="submit">
            <FiSearch size={16} style={{ margin: '8px', cursor: 'pointer' }} />
          </button>
        </SearchInput>
        <p>
          (Total{' '}
          <strong>
            <b>{100})</b>
          </strong>
        </p>
        <Link to={'/'}>
          <FiPlus size={22} color="white" />
        </Link>
      </Nav>
      <ProfessionalServicesGallery>
        {professionalServices.map(professionalService => (
          <ProfessionalServicesItem key={professionalService.id}>
            <CardHeader>
              <Avatar>
                <img
                  src={`https://i.pravatar.cc/250/img=${professionalService.professional}`}
                  alt="Marcos Paulo Siqueira Malandro"
                />
              </Avatar>
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
      </ProfessionalServicesGallery>
    </Container>
  );
};

export default ProfessionalServicesList;
