import React from 'react';

import Header from '../../components/Header';
import PeopleTable from './PeopleTable';
import { Container } from './styles';

const People: React.FC = () => {
  return (
    <Container>
      <Header />
      <main>
        <PeopleTable />
      </main>
    </Container>
  );
};

export default People;
