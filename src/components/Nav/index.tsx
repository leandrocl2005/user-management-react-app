import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container } from './styles';

interface NavProps {
  containerStyle?: object;
  total: number;
  pathCreate: string;
}

const Nav: React.FC<NavProps> = ({
  children,
  total,
  pathCreate,
  containerStyle,
  ...rest
}) => {
  return (
    <Container style={containerStyle} {...rest}>
      {children}
      <p>
        (Total{' '}
        <strong>
          <b>{total})</b>
        </strong>
      </p>
      <Link to={pathCreate}>
        <FiPlus size={22} color="white" />
      </Link>
    </Container>
  );
};

export default Nav;
