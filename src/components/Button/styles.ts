import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #245c2b;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  width: 100%;
  color: #ffffee;
  font: 400 1rem Nunito, sans-serif;
  margin-top: 16px;
  transition: background-color 0.2ms;

  &:hover {
    background: ${shade(0.2, '#245c2b')};
  }
`;
