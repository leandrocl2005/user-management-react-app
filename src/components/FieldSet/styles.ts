import styled from 'styled-components';

export const Container = styled.fieldset`
  border: 0;
  border-bottom: 1px solid #d3e2e5;
  padding-bottom: 16px;

  & + fieldset {
    margin-top: 16px;
  }

  legend {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    font-size: 24px;
    line-height: 34px;
    color: #182c1e;
    font-weight: 700;
    padding-bottom: 8px;
  }
`;
