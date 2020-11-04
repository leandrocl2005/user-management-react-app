import React from 'react';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

interface PeopleTableTheadProps {
  nameOrder: string;
  handleNameOrder(): void;
}

const PeopleTableThead: React.FC<PeopleTableTheadProps> = ({
  nameOrder,
  handleNameOrder,
}: PeopleTableTheadProps) => {
  return (
    <thead>
      <tr>
        <th onClick={handleNameOrder} style={{ cursor: 'pointer' }}>
          {nameOrder === 'asc' ? <FiArrowDown /> : <FiArrowUp />} Nome
        </th>
        <th></th>
      </tr>
    </thead>
  );
};

export default PeopleTableThead;
