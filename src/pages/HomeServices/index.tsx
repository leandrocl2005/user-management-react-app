import React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';
import { Container } from './styles';
import Header from '../../components/Header';
import api from '../../services/api';

interface HomeService {
  id: number;
  home_service: string;
}

const HomeServices: React.FC = () => {
  const [homeServices, setHomeServices] = useState<HomeService[]>([]);

  useEffect(() => {
    async function loadHomeServices(): Promise<void> {
      const response = await api.get('home_services');
      setHomeServices(response.data);
    }
    loadHomeServices();
  }, []);

  return (
    <ul>
      {homeServices.map(({ id, home_service }: HomeService) => (
        <li key={id}>{home_service}</li>
      ))}
    </ul>
  );
};

export default HomeServices;
