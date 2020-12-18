import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
  column-gap: 16px;
  row-gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #d3d4d5;
  margin: 16px 32px;
  border-radius: 8px;
  padding: 8px 16px;

  p {
    color: #777;
    strong {
      color: #111;
      font-weight: 700;
    }
  }
`;

export const SearchInput = styled.form`
  border: 1px solid #d3d4d5;
  width: 200px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;

  input {
    width: 100%;
    border: none;
    border-radius: 8px;
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
`;

export const SelectContainer = styled.div`
  position: absolute;
  background: white;
  border: 1px solid #d3d4d5;
  border-radius: 8px;
  top: 34px;
  overflow: visible;
`;
export const SelectItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #d3d4d5;
  cursor: pointer;
  transition: 400ms;
  padding: 8px 16px 8px 16px;

  :last-child {
    border-bottom: none;
    border-radius: 0 0 8px 8px;
  }

  :first-child {
    border-radius: 8px 8px 0 0;
  }

  :first-child:last-child {
    border-radius: 8px 8px 8px 8px;
  }

  :hover {
    background: #f3f4f5;
  }
`;
export const Avatar = styled.div`
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`;
export const SelectTextContainer = styled.div`
  margin-left: 16px;
  h3 {
    font-size: 12px;
    font-weight: 700;
  }

  p {
    font-size: 10px;
    color: #777;
  }
`;

export const Form = styled.form`
  @media (min-width: 600px) {
    min-width: 500px;
  }
  max-width: 700px;

  margin: 32px 16px;

  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;

  padding: 32px 64px;

  overflow: visible;

  fieldset {
    border: 0;
    border-bottom: 1px solid #d3e2e5;
    padding-bottom: 16px;
  }

  fieldset + fieldset {
    margin-top: 16px;
  }

  fieldset legend {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    font-size: 24px;
    line-height: 34px;
    color: #182c1e;
    font-weight: 700;
    margin-bottom: 8px;
    padding-bottom: 8px;
  }

  .input-block + .input-block {
    margin-top: 16px;
  }

  .input-block label {
    display: flex;
    color: #777;
    margin-bottom: 8px;
    line-height: 24px;
  }

  .input-block label span {
    font-size: 14px;
    color: #414941;
    margin-left: 24px;
    line-height: 24px;
  }

  .input-block input,
  .input-block textarea {
    width: 100%;
    background: #f5f8f5;
    border: 1px solid #d3e2e5;
    border-radius: 8px;
    outline: none;
    color: #414941;
  }

  .input-block input {
    height: 32px;
    padding: 0 16px;
  }

  .input-block textarea {
    min-height: 120px;
    max-height: 240px;
    resize: vertical;
    padding: 16px;
    line-height: 28px;
  }

  select {
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
  }

  button.confirm-button {
    margin-top: 32px;

    width: 100%;
    height: 32px;
    border: 0;
    cursor: pointer;
    background: #245c2b;
    border-radius: 20px;
    color: #ffffff;
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.2s;
  }
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
