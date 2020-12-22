import React, { FormEvent, useEffect, useState } from 'react';

import {
  Container,
  HomeServicesItem,
  CardHeader,
  CardBody,
  ServicesContainer,
} from './styles';

import Header from '../../../components/Header';
import SearchForm from '../../../components/SearchForm';
import Avatar from '../../../components/Avatar';
import Nav from '../../../components/Nav';
import GalleryContainer from '../../../components/GalleryContainer';

import api from '../../../services/api';

interface HomeService {
  id: number;
  person_name: string;
  formatted_created_at: string;
  breakfast: string;
  lunch: string;
  shower: string;
  dinner: string;
  snack: string;
  sleep: string;
}

const HomeServicesList: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [totalHomeServices, setTotalHomeServices] = useState(0);
  const [homeServices, setHomeServices] = useState<HomeService[]>([]);
  const [searchSubmit, setSearchSubmit] = useState('');

  useEffect(() => {
    async function loadHomeServices(): Promise<void> {
      try {
        let url = '/api/v1/home_services/?';
        url += 'limit=12';
        url += `&search=${searchSubmit}`;
        const response = await api.get(url);
        setHomeServices(response.data.results);
        setTotalHomeServices(response.data.count);
      } catch (err) {
        console.log(err);
      }
    }
    loadHomeServices();
  }, [searchSubmit]);

  const handleSearchSubmit = (event: FormEvent): void => {
    event.preventDefault();
    setSearchSubmit(searchInput);
  };

  return (
    <Container>
      <Header />
      <Nav total={totalHomeServices} pathCreate={'/create-home-services'}>
        <SearchForm onSubmit={event => handleSearchSubmit(event)}>
          <input
            placeholder="Buscar por nome"
            name="filter"
            value={searchInput}
            onChange={event => setSearchInput(event.target.value)}
          />
        </SearchForm>
      </Nav>
      <GalleryContainer>
        {homeServices.map(homeService => (
          <HomeServicesItem key={homeService.id}>
            <CardHeader>
              <p>{homeService.person_name}</p>
              <p>
                <strong>Data dos serviços:</strong>{' '}
                {homeService.formatted_created_at}
              </p>
            </CardHeader>
            <CardBody>
              <Avatar src={''} alt={''} />
              <ServicesContainer>
                <p
                  style={{
                    backgroundColor: homeService.breakfast
                      ? '#84c4b7'
                      : '#414941',
                    opacity: homeService.breakfast ? 1 : 0.1,
                    color: 'white',
                  }}
                >
                  Café da manhã
                </p>
                <p
                  style={{
                    backgroundColor: homeService.lunch ? '#84c4b7' : '#414941',
                    opacity: homeService.lunch ? 1 : 0.1,
                    color: 'white',
                  }}
                >
                  Almoço
                </p>
                <p
                  style={{
                    backgroundColor: homeService.snack ? '#84c4b7' : '#414941',
                    opacity: homeService.snack ? 1 : 0.1,
                    color: 'white',
                  }}
                >
                  Café da tarde
                </p>
                <p
                  style={{
                    backgroundColor: homeService.shower ? '#84c4b7' : '#414941',
                    opacity: homeService.shower ? 1 : 0.1,
                    color: 'white',
                  }}
                >
                  Banho
                </p>
                <p
                  style={{
                    backgroundColor: homeService.sleep ? '#84c4b7' : '#414941',
                    opacity: homeService.sleep ? 1 : 0.1,
                    color: 'white',
                  }}
                >
                  Per noite
                </p>
                <p
                  style={{
                    backgroundColor: homeService.dinner ? '#84c4b7' : '#414941',
                    opacity: homeService.dinner ? 1 : 0.1,
                    color: 'white',
                  }}
                >
                  Jantar
                </p>
              </ServicesContainer>
            </CardBody>
          </HomeServicesItem>
        ))}
      </GalleryContainer>
    </Container>
  );
};

export default HomeServicesList;
