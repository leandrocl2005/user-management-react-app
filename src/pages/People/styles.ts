import styled from 'styled-components';

export const Container = styled.div``;
export const Content = styled.div``;

export const PageNumbersContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  column-gap: 16px;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 50%;
    transition: background 400ms;
    :hover {
      color: #225522;
      cursor: pointer;
      background: #f3f4f5;
    }
  }
`;

export const Pagination = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RowsPerPageContainer = styled.div`
  position: relative;
  border: 1px solid #d3d4d5;
  width: min-content;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
  padding: 4px;
  border-radius: 8px;
  color: #555;
  :hover {
    cursor: pointer;
  }

  ul {
    position: absolute;
    list-style-type: none;
    margin: 0;
    padding: 0;
    top: 32px;
    background: #fff;
    border: 1px solid #d3d4d5;
    border-radius: 8px;
    li {
      margin: 0;
      box-sizing: border-box;
      padding: 4px 12px;
      color: #555;
      :hover {
        font-weight: 700;
        color: #225522;
        cursor: pointer;
      }
    }
  }
`;

export const TableContainer = styled.div`
  border: 1px solid #d3d4d5;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.3);
  margin: 32px auto;
  padding: 16px 16px;
  border-radius: 8px;
  max-width: 500px;
  display: table;
  justify-content: center;

  table {
    border-collapse: collapse;
    margin: 16px 0;

    td,
    th {
      padding: 16px;
      border-bottom: 1px solid #d3d4d5;
    }

    th {
      text-align: left;
    }

    tbody {
      tr {
        :hover {
          background: #f3f4f5;
          cursor: pointer;
        }
      }

      td {
        span {
          margin-left: 8px;
        }
      }
    }
  }
`;
