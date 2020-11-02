import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.4);

  div {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-left: 16px;

    img {
      height: 128px;
    }
  }
`;
