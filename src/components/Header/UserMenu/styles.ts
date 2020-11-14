import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  cursor: pointer;
  z-index: 40;

  ul {
    border: 1px solid #d3d4d5;
    position: absolute;
    top: 48px;
    right: 32px;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 8px;
    z-index: 50;

    a,
    button {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;

      padding: 8px 8px;
      color: #182c1eaa;
      transition: color 0.2s;
      font: 700 1rem Nunito, sans-serif;

      &:hover {
        background: ${shade(0.05, '#ffffee')};
        cursor: pointer;
      }

      :first-child {
        border-radius: 8px 8px 0px 0px;
      }

      :last-child {
        border-radius: 0px 0px 8px 8px;
      }
    }

    a {
      text-decoration: none;
      p {
        font: 400 18px Nunito, sans-serif;
        margin-left: 8px;
      }
    }

    button {
      border: none;
      background: #fff;
      width: 100%;
    }
  }
`;
