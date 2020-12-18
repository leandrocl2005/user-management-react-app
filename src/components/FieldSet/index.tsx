import React from 'react';

import { Container } from './styles';

const FieldSet: React.FC = ({ children, ...rest }) => {
  return <Container {...rest}>{children}</Container>;
};

export default FieldSet;
