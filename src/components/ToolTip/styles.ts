import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);

    color: #312e38;

    &::before {
      content: ' ';
      color: #ff9000;
      border-style: solid;
      border-color: '#ff9000' transparent;
      border-width: 0px 8px 8px 0px;
      top: 90%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
