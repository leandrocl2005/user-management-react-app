import React, { FormEvent, useEffect, useState } from 'react';

import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
} from 'react-icons/fi';

import {
  RowsPerPageContainer,
  TableContainer,
  Pagination,
  PageNumbersContainer,
  SearchInput,
} from './styles';

import api from '../../../services/api';
import { useToast } from '../../../hooks/toast';
import PeopleTableThead from './PeopleTableThead';
import PeopleTableTbody from './PeopleTableTbody';

interface People {
  id: number;
  name: string;
  mother_name: string;
  cpf: string;
  born_date: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
}

const PeopleTable: React.FC = () => {
  const { addToast } = useToast();

  const [people, setPeople] = useState<People[]>([]);
  const [limit, setLimit] = useState(0);
  const [offset, setOffSeat] = useState(0);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState<string | null>(null);
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
  const [openRow, setOpenRow] = useState<number | null>(null);

  useEffect(() => {
    async function loadPeople(): Promise<void> {
      try {
        const response = await api.get(
          `api/v1/people/?limit=${limit}&offset=${offset}`,
        );
        setPeople(response.data.results);
        const totalPeopleValue = response.data.count;
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
  }, [
    offset,
    limit,
    nameOrder,
    searchName,
    rowsPerPage,
    addToast,
    currentPage,
  ]);

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
    setCurrentPage(1);
  }

  function handleShowPersonRow(id: number): void {
    if (id === openRow) {
      setOpenRow(null);
      return;
    }
    setOpenRow(id);
  }

  function handleNameOrder(): void {
    setNameOrder(nameOrder === 'asc' ? 'desc' : 'asc');
  }
  return (
    <TableContainer>
      <SearchInput onSubmit={handleSearch}>
        <input
          placeholder="Buscar por nome"
          name="filter"
          value={searchInputValue}
          onChange={event => setSearchInputValue(event.target.value)}
        />
        <button type="submit">
          <FiSearch size={16} style={{ margin: '8px', cursor: 'pointer' }} />
        </button>
      </SearchInput>

      <table>
        <PeopleTableThead
          handleNameOrder={handleNameOrder}
          nameOrder={nameOrder}
        />

        <PeopleTableTbody
          people={people}
          openRow={openRow}
          handleShowPersonRow={handleShowPersonRow}
        />
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
                  setCurrentPage(1);
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
  );
};

export default PeopleTable;
