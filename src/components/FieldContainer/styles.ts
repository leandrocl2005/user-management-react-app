import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 8px;

  label {
    display: flex;
    color: #777;
    margin-bottom: 8px;
    line-height: 24px;
  }

  label span {
    font-size: 14px;
    color: #414941;
    margin-left: 24px;
    line-height: 24px;
  }

  input,
  textarea {
    width: 100%;
    background: #f5f8f5;
    border: 1px solid #d3e2e5;
    border-radius: 8px;
    outline: none;
    color: #414941;
  }

  input {
    height: 32px;
    padding: 0 16px;
  }

  textarea {
    min-height: 120px;
    max-height: 240px;
    resize: vertical;
    padding: 16px;
    line-height: 28px;
  }
`;
