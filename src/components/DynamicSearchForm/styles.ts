import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  border: 1px solid #d3d4d5;
  width: 200px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  z-index: 40;

  input {
    width: 100%;
    border: none;
    border-radius: 8px;
    padding: 4px 8px;
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
`;

export const SelectContainer = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #d3d4d5;
  border-radius: 8px;
  top: 34px;
  overflow: visible;
`;
