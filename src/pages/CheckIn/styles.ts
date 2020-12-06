import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin: 64px 16px 0 16px;
  div {
    height: 120px;
    width: 200px;
    background-color: #efefef;
    padding: 8px 16px;
    border-radius: 8px;
    margin: 16px 8px;
  }
`;
