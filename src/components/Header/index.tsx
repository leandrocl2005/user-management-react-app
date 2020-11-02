import React from 'react';
import { HiUserCircle } from 'react-icons/hi';

import { Container } from './styles';
import Menu from './Menu';

const Header: React.FC = () => {
  return (
    <Container>
      <Menu />
      <HiUserCircle size={48} style={{ marginRight: '16px' }} />
    </Container>
  );
};

export default Header;
