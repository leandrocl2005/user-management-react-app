import styled from 'styled-components';

interface FilterButtonStyleProps {
  color: string;
}

export const Container = styled.button<FilterButtonStyleProps>`
  margin: 8px 0;
  padding: 4px 8px;
  border: none;
  border-radius: 8px;
  background-color: ${props => props.color};
  color: white;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
  transition: 400ms;

  :hover {
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.7);
  }
`;
