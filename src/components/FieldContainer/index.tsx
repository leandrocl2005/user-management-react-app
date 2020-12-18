import React from 'react';

import { Container } from './styles';

interface FieldContainerProps {
  containerStyle?: object;
}

const FieldContainer: React.FC<FieldContainerProps> = ({
  children,
  containerStyle,
  ...rest
}) => {
  return (
    <Container style={containerStyle} {...rest}>
      {children}
    </Container>
  );
};

export default FieldContainer;
