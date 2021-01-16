import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
