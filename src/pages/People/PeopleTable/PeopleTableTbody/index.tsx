import React from 'react';
import { FiChevronDown, FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, CustomTableCell } from './styles';

interface People {
  id: number;
  name: string;
  mother_name: string;
  cpf: string;
  born_date: string;
  email: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  ddd_private_phone: string;
  private_phone: string;
}

interface PeopleTableTbodyProps {
  people: People[];
  openRow: number | null;
  handleShowPersonRow(id: number): void;
}

const PeopleTableTbody: React.FC<PeopleTableTbodyProps> = ({
  people,
  openRow,
  handleShowPersonRow,
}: PeopleTableTbodyProps) => {
  return (
    <Container>
      {people.map(person => (
        <tr key={person.id} onClick={() => handleShowPersonRow(person.id)}>
          <td>
            <CustomTableCell>
              <p>
                <FiChevronDown size={16} />
                <span>{person.name}</span>
              </p>
              <p>
                <strong>Dt. Nasc.:</strong> <span>{person.born_date}</span>
              </p>
            </CustomTableCell>
            <CustomTableCell>
              {openRow &&
                (openRow === person.id ? (
                  <div className="person-more-info">
                    <p></p>
                    <p>
                      <strong>Mãe:</strong> <span>{person.mother_name}</span>
                    </p>
                    <p>
                      <strong>CPF:</strong> <span>{person.cpf}</span>
                    </p>
                    <p>
                      <strong>Endereço:</strong>{' '}
                      <span>{person.address_line_1}</span>
                    </p>
                    <p>
                      <strong>Complemento:</strong>{' '}
                      <span>{person.address_line_2}</span>
                    </p>
                    <p>
                      <strong>Cidade:</strong> <span>{person.city}</span>
                    </p>
                    <p>
                      <strong>Estado:</strong> <span>{person.state}</span>
                    </p>
                    <p>
                      <strong>Telefone:</strong>{' '}
                      <span>{`(${person.ddd_private_phone}) ${person.private_phone}`}</span>
                    </p>
                  </div>
                ) : (
                    ''
                  ))}
            </CustomTableCell>
          </td>
          <td>
            <div>
              <Link to={`/people/${person.id}`}>
                <FiEdit />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </Container>
  );
};

export default PeopleTableTbody;
