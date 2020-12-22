import styled from 'styled-components';

export const Container = styled.div`
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
  max-width: 700px;

  a {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #b8d866;
    cursor: pointer;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
    text-decoration: none;
  }

  p {
    color: #777;
    strong {
      color: #111;
      font-weight: 700;
    }
  }
`;
