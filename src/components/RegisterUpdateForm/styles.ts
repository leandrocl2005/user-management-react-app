import styled from 'styled-components';

export const Container = styled.form`
  @media (min-width: 600px) {
    min-width: 500px;
  }

  @media (min-width: 700px) {
    min-width: 600px;
  }

  @media (min-width: 800px) {
    min-width: 700px;
  }

  max-width: 700px;

  margin: 16px 16px;

  background: #ffffff;
  border: 1px solid #d3e2e5;
  border-radius: 20px;

  padding: 32px 64px;

  // overflow: hidden;
`;
