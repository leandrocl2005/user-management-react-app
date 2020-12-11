import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

  fieldset {
    border: 0;
    border-bottom: 1px solid #d3e2e5;
    padding-bottom: 16px;
  }

  fieldset + fieldset {
    margin-top: 16px;
  }

  fieldset legend {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    font-size: 24px;
    line-height: 34px;
    color: #182c1e;
    font-weight: 700;
    margin-bottom: 8px;
    padding-bottom: 8px;
  }

  .input-block + .input-block {
    margin-top: 16px;
  }

  .input-block label {
    display: flex;
    color: #777;
    margin-bottom: 8px;
    line-height: 24px;
  }

  .input-block label span {
    font-size: 14px;
    color: #414941;
    margin-left: 24px;
    line-height: 24px;
  }

  .input-block input,
  .input-block textarea {
    width: 100%;
    background: #f5f8f5;
    border: 1px solid #d3e2e5;
    border-radius: 8px;
    outline: none;
    color: #414941;
  }

  .input-block input {
    height: 32px;
    padding: 0 16px;
  }

  .input-block textarea {
    min-height: 120px;
    max-height: 240px;
    resize: vertical;
    padding: 16px;
    line-height: 28px;
  }

  select {
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
  }

  /* select {
    -webkit-appearance: none;
    -moz-appearance: none;

    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-position-x: 100%;
    background-position-y: 5px;

    border-radius: 8px;
    padding: 1rem;
    padding-right: 16px;
    height: 24px;
  } */

  button.confirm-button {
    margin-top: 32px;

    width: 100%;
    height: 32px;
    border: 0;
    cursor: pointer;
    background: #245c2b;
    border-radius: 20px;
    color: #ffffff;
    font-weight: 700;

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color 0.2s;
  }
`;
