import styled from 'styled-components';

export const Container = styled.div``;

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
  width: 100%;

  display: table;
  justify-content: center;

  form {
    border: 1px solid #d3d4d5;
    width: 280px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    input {
      width: 100%;
      border: none;
      padding-left: 8px;
      color: #333;

      :-webkit-autofill,
      :-webkit-autofill:hover,
      :-webkit-autofill:focus,
      :-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;
      }
    }

    button {
      background: #fff;
      border: none;
      border-radius: inherit;
      display: flex;
      align-items: center;
    }
  }

  table {
    border-collapse: collapse;
    margin: 16px 0;
    width: 100%;
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
        height: 55px;

        td:first-child {
          display: grid;
          grid-template-columns: 28px auto;
          column-gap: 8px;
          align-items: center;
        }
      }
    }
  }
`;
