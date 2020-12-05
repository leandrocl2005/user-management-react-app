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
  address_line_1: string;
  address_line_2: string;
  city: string;
  state: string;
  ddd_private_phone: string;
  private_phone: string;
}

const PeopleTable: React.FC = () => {
  const { addToast } = useToast();

  const [people, setPeople] = useState<People[]>([]);
  const [limit, setLimit] = useState(5);
  const [offset, setOffSet] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  const [ordering, setOrdering] = useState('name');

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const [rowsPerPageVisibility, setRowsPerPageVisibility] = useState(false);
  const [pageLimitInf, setPageLimitInf] = useState(1);
  const [pageLimitSup, setPageLimitSup] = useState(1);

  const [searchName, setSearchName] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');
  const [openRow, setOpenRow] = useState<number | null>(null);

  useEffect(() => {
    async function loadPeople(): Promise<void> {
      try {
        let url = 'api/v1/people/';
        url += `?limit=${limit}&offset=${offset}`;
        url += `&ordering=${ordering}`;
        if (searchName) url += `&search=${searchName}`;
        const response = await api.get(url);
        setPeople(response.data.results);
        const totalPeopleValue = response.data.count;
        setTotalPeople(totalPeopleValue);

        const lastPageNumber = Math.ceil(totalPeopleValue / limit);
        setLastPage(lastPageNumber);

        const inf = (currentPage - 1) * limit + 1;
        const sup = Math.min(currentPage * limit, totalPeopleValue);
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
  }, [offset, limit, ordering, searchName, addToast, currentPage]);

  function handleNextPageClick(): void {
    if (currentPage === lastPage) {
      return;
    }
    setCurrentPage(currentPage + 1);
    setOffSet(offset + limit);
  }

  function handlePreviousPageClick(): void {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
    setOffSet(offset - limit);
  }

  function handleSearch(event: FormEvent): void {
    event.preventDefault();
    setSearchName(searchInputValue);
    setCurrentPage(1);
    setOffSet(0);
    setLimit(5);
  }

  function handleShowPersonRow(id: number): void {
    if (id === openRow) {
      setOpenRow(null);
      return;
    }
    setOpenRow(id);
  }

  function handleNameOrder(): void {
    setOrdering(ordering === 'name' ? '-name' : 'name');
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
          nameOrder={ordering}
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
          {limit} <FiChevronDown />
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
                  setLimit(rows);
                  setOffSet(0);
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
