import React from 'react';

import { Container, Avatar, SelectTextContainer } from './styles';

interface Person {
  id: number;
  avatar: string;
  name: string;
  formatted_born_date: string;
}

interface SelectPersonItemProps {
  person: Person;
  handleClick: (person: Person) => void;
  key: number;
}

const SelectPersonItem: React.FC<SelectPersonItemProps> = ({
  person,
  handleClick,
  children,
  key,
  ...rest
}) => (
  <Container {...rest} key={key} onClick={() => handleClick(person)}>
    <Avatar>
      <img
        src={`https://i.pravatar.cc/250/img=${person.id}`}
        alt={person.name}
      />
    </Avatar>
    <SelectTextContainer>
      <h3>{person.name}</h3>
      <p>Dt. Nasc.: {person.formatted_born_date}</p>
    </SelectTextContainer>
    {children}
  </Container>
);

export default SelectPersonItem;
