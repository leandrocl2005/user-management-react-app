import styled, { css } from 'styled-components';

import Tooltip from '../ToolTip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  border: 2px solid #245c2b;
  padding: 16px;
  width: 100%;
  display: flex;
  color: '#ffffee';

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #f44336;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #72b01d;
      border-color: #72b01d;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #72b01d;
    `}

  input {
    background: transparent;
    flex: 1;
    border: 0;
    color: #182c1e;
    font: 400 1rem Nunito, sans-serif;

    &::placeholder {
      color: '#fff';
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #f44336;
    color: #fff;

    &::before {
      color: #f44336;
      border-color: #f44336;
    }
  }
`;
