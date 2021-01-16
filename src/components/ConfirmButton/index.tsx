import React from 'react';

import { Container } from './styles';

interface ConfirmButtonProps {
  text?: string;
  type?: 'button' | 'submit' | 'reset';
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  children,
  text,
  type,
  ...rest
}) => {
  return (
    <Container type={type} {...rest}>
      {text || ''}
      {children}
    </Container>
  );
};

export default ConfirmButton;
