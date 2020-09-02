import styled from 'styled-components';

export const Container = styled.div`
  background: #232129;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  display: flex;
  color: '#666360';

  & + div {
    margin-top: 8px;
  }

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #faede8;

    &::placeholder {
      color: '#666360';
    }

    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #232129 inset !important;
    }

    &:-webkit-autofill {
      -webkit-text-fill-color: #faede8 !important;
      -webkit-text-fill-font-size: 16px !important;
      -webkit-text-fill-font-weight: 500 !important;
      -webkit-text-fill-font-family: 'Roboto Slab', serif !important;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
