import React from 'react';
import Header from '../../components/Header';
import { Container } from './styles';

export default function Notifications(): JSX.Element {
  return (
    <Container>
      <Header />
      <h1>Nenhuma notificação! Tudo ok!</h1>
    </Container>
  );
}
