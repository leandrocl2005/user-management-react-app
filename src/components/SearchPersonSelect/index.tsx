import React from 'react';

import { Container } from './styles';

import SelectPersonItem from '../SelectPersonItem';

interface Person {
  id: number;
  avatar: string;
  name: string;
  formatted_born_date: string;
}

interface SearchPersonSelectProps {
  containerStyle?: object;
  allPeople: Person[];
  handleClick: (person: Person) => void;
  key: number;
}

const SearchPersonSelect: React.FC<SearchPersonSelectProps> = ({
  children,
  containerStyle,
  handleClick,
  allPeople,
  ...rest
}) => (
  <Container
    style={{
      ...containerStyle,
      display: allPeople.length !== 0 ? 'block' : 'none',
    }}
    {...rest}
  >
    {allPeople &&
      allPeople.map(person => (
        <SelectPersonItem
          key={person.id}
          handleClick={handleClick}
          person={person}
        />
      ))}
    {children}
  </Container>
);

export default SearchPersonSelect;
