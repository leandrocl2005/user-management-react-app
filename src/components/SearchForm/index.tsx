import React, { FormHTMLAttributes } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

interface SearchFormProps extends FormHTMLAttributes<HTMLFormElement> {
  containerStyle?: object;
}

const SearchForm: React.FC<SearchFormProps> = ({
  children,
  containerStyle,
  ...rest
}) => (
  <Container {...rest} style={containerStyle}>
    {children}{' '}
    <button type="submit">
      <FiSearch size={16} style={{ margin: '8px', cursor: 'pointer' }} />
    </button>
  </Container>
);

export default SearchForm;
