import React, { FormHTMLAttributes } from 'react';

import { Container } from './styles';

const RegisterUpdateForm: React.FC<FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...rest
}) => <Container {...rest}>{children} </Container>;

export default RegisterUpdateForm;
