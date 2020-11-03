import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container } from './styles';

interface People {
  id: number;
  name: string;
  mother_name: string;
  cpf: string;
  born_day: string;
  born_month: string;
  born_year: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
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
            <div className="person-name-and-born">
              <FiChevronDown size={18} />
              <span>{person.name}</span>
            </div>
            <div>
              {openRow &&
                (openRow === person.id ? (
                  <div className="person-more-info">
                    <p>
                      <strong>
                        <b>Mãe:</b>
                      </strong>{' '}
                      <span>{person.mother_name}</span>
                    </p>
                    <p>
                      <strong>
                        <b>CPF:</b>
                      </strong>{' '}
                      <span>{person.cpf}</span>
                    </p>
                    <p>
                      <strong>
                        <b>Rua:</b>
                      </strong>{' '}
                      <span>{person.address.street}</span>
                    </p>
                    <p>
                      <strong>
                        <b>Complemento:</b>
                      </strong>{' '}
                      <span>{person.address.suite}</span>
                    </p>
                    <p>
                      <strong>
                        <b>Cidade:</b>
                      </strong>{' '}
                      <span>{person.address.city}</span>
                    </p>
                    <p>
                      <strong>
                        <b>Estado:</b>
                      </strong>{' '}
                      <span>Minas gerais</span>
                    </p>
                    <p>
                      <strong>
                        <b>Telefone:</b>
                      </strong>{' '}
                      <span>{person.phone}</span>
                    </p>
                    <div className="btn-update-people">
                      <Link to="/people-update">Atualizar</Link>
                    </div>
                  </div>
                ) : (
                  ''
                ))}
            </div>
          </td>
          <td>
            <span>
              {`${person.born_day}/${person.born_month}/${person.born_year}`}
            </span>
          </td>
        </tr>
      ))}
    </Container>
  );
};

export default PeopleTableTbody;
