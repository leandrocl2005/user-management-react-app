import React, { FormEvent, useEffect, useState } from 'react';

import {
  FiArrowDown,
  FiArrowUp,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
} from 'react-icons/fi';
import {
  Container,
  RowsPerPageContainer,
  TableContainer,
  Pagination,
  PageNumbersContainer,
} from './styles';
import Header from '../../components/Header';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface People {
  id: number;
  name: string;
  born_day: string;
  born_month: string;
  born_year: string;
}

const People: React.FC = () => {
  const { addToast } = useToast();

  const [people, setPeople] = useState<People[]>([]);

  const [totalPeople, setTotalPeople] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rowsPerPageVisibility, setRowsPerPageVisibility] = useState(false);
  const [pageLimitInf, setPageLimitInf] = useState(1);
  const [pageLimitSup, setPageLimitSup] = useState(1);

  const [nameOrder, setNameOrder] = useState('asc');
  const [searchName, setSearchName] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    async function loadPeople(): Promise<void> {
      try {
        const response = await api.get(
          `users?_sort=name&_order=${nameOrder}&_page=${currentPage}&_limit=${rowsPerPage}&name_like=${searchName}`,
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
        addToast({
          type: 'error',
          title: 'Erro ao buscar pessoas!',
          description: 'Ocorreu um erro ao buscar pessoas!',
        });
      }
    }

    loadPeople();
  }, [currentPage, rowsPerPage, nameOrder, searchName, addToast]);

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

  function handleSearch(event: FormEvent): void {
    event.preventDefault();
    setSearchName(searchInputValue);
  }

  return (
    <Container>
      <Header />
      <TableContainer>
        <form onSubmit={handleSearch}>
          <input
            placeholder="Buscar por nome"
            name="filter"
            value={searchInputValue}
            onChange={event => setSearchInputValue(event.target.value)}
          />
          <button type="submit">
            <FiSearch size={16} style={{ margin: '8px', cursor: 'pointer' }} />
          </button>
        </form>

        <table>
          <thead>
            <tr>
              <th
                onClick={() =>
                  setNameOrder(nameOrder === 'asc' ? 'desc' : 'asc')
                }
                style={{ cursor: 'pointer' }}
              >
                {nameOrder === 'asc' ? <FiArrowDown /> : <FiArrowUp />} Nome
              </th>
              <th>Dt. Nasc.</th>
            </tr>
          </thead>
          <tbody>
            {people.map(person => (
              <tr key={person.id}>
                <td>
                  <div className="person-data">
                    <FiChevronDown size={18} />
                    <span>{person.name}</span>
                  </div>
                </td>
                <td>
                  <span>
                    {`${person.born_day}/${person.born_month}/${person.born_year}`}
                  </span>
                </td>
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
    </Container>
  );
};

export default People;
