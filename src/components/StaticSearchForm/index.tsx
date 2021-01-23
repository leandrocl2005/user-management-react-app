import React, { ChangeEvent } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Container } from './styles';

interface SearchFormProps {
  containerStyle?: object;
  name: string;
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClickSearch: () => void;
}

const StaticSearchForm: React.FC<SearchFormProps> = ({
  containerStyle,
  name,
  value,
  placeholder,
  onChange,
  onClickSearch,
  ...rest
}) => (
  <Container {...rest} style={containerStyle}>
    <input
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    />
    <button type="button" onClick={onClickSearch}>
      <FiSearch size={16} style={{ margin: '8px', cursor: 'pointer' }} />
    </button>
  </Container>
);

export default StaticSearchForm;
