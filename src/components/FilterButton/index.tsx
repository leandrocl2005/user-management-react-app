import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  text: string;
}

const FilterButton: React.FC<ButtonProps> = ({ color, text, ...rest }) => {
  return (
    <Container color={color} {...rest}>
      {text}
    </Container>
  );
};

export default FilterButton;
