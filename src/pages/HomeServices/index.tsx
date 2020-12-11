import React from 'react';

import { Container } from './styles';
import Header from '../../components/Header';

interface HomeService {
  id: number;
  home_service: string;
}

const HomeServices: React.FC = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export default HomeServices;
