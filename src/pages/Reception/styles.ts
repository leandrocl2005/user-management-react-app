import styled from 'styled-components';

export const Container = styled.div``;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-top: 32px;
    font-size: 20px;
    text-align: left;
  }
`;
export const SearchInput = styled.form`
  border: 1px solid #d3d4d5;
  margin-top: 16px;
  width: 260px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  position: relative;

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
      width: 260px;
      box-sizing: border-box;
      padding: 4px 12px;
      color: #555;
      :hover {
        cursor: pointer;
        background: #f3f4f5;
        border-radius: inherit;
      }
    }
  }
`;

export const SearchPeopleList = styled.ul``;
