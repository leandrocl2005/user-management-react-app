import React, { FormHTMLAttributes } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

const SearchForm: React.FC<FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  ...rest
}) => (
  <Container {...rest}>
    {children}{' '}
    <button type="submit">
      <FiSearch size={16} style={{ margin: '8px', cursor: 'pointer' }} />
    </button>
  </Container>
);

export default SearchForm;
