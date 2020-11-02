import React from 'react';

import { Container, Content } from './styles';
import Header from '../../components/Header';

const HomeServices: React.FC = () => {
  return (
    <Container>
      <Header />

      <Content>This is the People page content</Content>
    </Container>
  );
};

export default HomeServices;
