import React from 'react';

import { Container } from './styles';

import notfound from '../../assets/notfound.jpg';

const NotFound: React.FC = () => {
  return (
    <Container>
      <img src={notfound} alt="Página não encontrada" />
    </Container>
  );
};

export default NotFound;
