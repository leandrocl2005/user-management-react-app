import styled from 'styled-components';

export const Container = styled.div`
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.4);
  width: 100vw;
  position: relative;
  height: 64px;
  padding: 0 16px;

  display: grid;
  grid-template-columns: auto 48px;
  justify-content: space-between;
  align-items: center;
`;
