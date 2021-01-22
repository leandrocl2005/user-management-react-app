import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputSelect = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background: #f5f8f5;
  flex: 1;
  border-radius: 8px;
  border: 1px solid #d3e2e5;
  padding: 8px 24px 8px 8px;
  font-size: 16px;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 5px;
  color: #414941;
`;

export const SelectContainer = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #d3d4d5;
  border-radius: 8px;
  top: 34px;
  overflow: visible;
`;

export const CheckBoxContainer = styled.label`
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 16px;
  margin-top: 16px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  strong {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #f5f8f5;
    border-radius: 8px;
    border: 1px solid #d3d4d5;

    :after {
      content: '';
      position: absolute;
      display: none;
    }
  }

  :hover input ~ span {
    background-color: #e5e8e5;
  }

  span:after {
    content: '';
    position: absolute;
    display: none;
  }

  input:checked ~ span:after {
    display: block;
  }

  span:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid #245c2b;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const MedicalProceduresContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;
  max-width: 300px;

  div + div {
    margin-right: 16px;
  }

  label {
    margin-right: 16px;
  }
`;

export const SearchForm = styled.div`
  position: relative;
  border: 1px solid #d3d4d5;
  width: 200px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

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
