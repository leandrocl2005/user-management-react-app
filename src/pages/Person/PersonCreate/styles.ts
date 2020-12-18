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

  overflow: hidden;
`;
