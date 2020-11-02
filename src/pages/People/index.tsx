import React, { useEffect, useState } from 'react';

import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  Container,
  Content,
  RowsPerPageContainer,
  TableContainer,
  Pagination,
  PageNumbersContainer,
} from './styles';
import Header from '../../components/Header';
import api from '../../services/api';

interface People {
  id: number;
  name: string;
  born_day: string;
  born_month: string;
  born_year: string;
}

const People: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);
  const [totalPeople, setTotalPeople] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsPerPageVisibility, setRowsPerPageVisibility] = useState(false);
  const [pageLimitInf, setPageLimitInf] = useState(1);
  const [pageLimitSup, setPageLimitSup] = useState(1);

  useEffect(() => {
    async function loadPeople(): Promise<void> {
      try {
        const response = await api.get(
          `users?_page=${currentPage}&_limit=${rowsPerPage}`,
        );
        setPeople(response.data);

        const totalPeopleValue = response.headers['x-total-count'];
        setTotalPeople(totalPeopleValue);

        const lastPageNumber = Math.ceil(totalPeopleValue / rowsPerPage);
        setLastPage(lastPageNumber);

        const inf = (currentPage - 1) * rowsPerPage + 1;
        const sup = Math.min(currentPage * rowsPerPage, totalPeopleValue);
        setPageLimitInf(inf);
        setPageLimitSup(sup);
      } catch (error) {
        console.log('Ocorreu um erro ao buscar pessoas.');
      }
    }

    loadPeople();
  }, [currentPage, rowsPerPage]);

  function handleNextPageClick(): void {
    if (currentPage === lastPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
  }

  function handlePreviousPageClick(): void {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  }

  return (
    <Container>
      <Header />
      <Content>
        <TableContainer>
          <form>
            <input type="text" placeholder="Nome ou CPF" name="people" />
          </form>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Dt. Nasc.</th>
              </tr>
            </thead>
            <tbody>
              {people.map(person => (
                <tr key={person.id}>
                  <td>
                    <FiChevronDown size={18} />
                    <span>{person.name}</span>
                  </td>
                  <td>{`${person.born_day}/${person.born_month}/${person.born_year}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination>
            <RowsPerPageContainer
              onClick={() => setRowsPerPageVisibility(!rowsPerPageVisibility)}
            >
              {rowsPerPage} <FiChevronDown />
              <ul
                style={
                  rowsPerPageVisibility
                    ? {
                        visibility: 'visible',
                      }
                    : {
                        visibility: 'hidden',
                      }
                }
              >
                {[5, 10, 25].map(rows => (
                  <li
                    key={rows}
                    onClick={() => {
                      setRowsPerPage(rows);
                      setRowsPerPageVisibility(false);
                    }}
                  >
                    {rows}
                  </li>
                ))}
              </ul>
            </RowsPerPageContainer>

            <PageNumbersContainer>
              <p>
                {pageLimitInf}-{pageLimitSup} de {totalPeople}
              </p>
              <div onClick={handlePreviousPageClick}>
                <FiChevronLeft size={16} />
              </div>
              <div onClick={handleNextPageClick}>
                <FiChevronRight size={16} />
              </div>
            </PageNumbersContainer>
          </Pagination>
        </TableContainer>
      </Content>
    </Container>
  );
};

export default People;
