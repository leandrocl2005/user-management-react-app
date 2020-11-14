import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 32px;

  h3 {
    color: #182c1e;
    padding: 0 16px;
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
    left: -2px;
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

export const CheckOutCard = styled.div`
  margin: 32px auto;
  border-radius: 8px;
  border: 1px solid #d3d4d5;
  padding: 16px 32px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.4);

  strong {
    font-weight: bold;
    color: #999;
  }

  span {
    color: #999;
  }

  button {
    background: #245c2b;
    height: 32px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    width: 100%;
    color: #ffffee;
    font: 400 1rem Nunito, sans-serif;
    margin-top: 16px;
    transition: background-color 0.2ms;

    &:hover {
      background: ${shade(0.2, '#245c2b')};
    }
  }
`;
