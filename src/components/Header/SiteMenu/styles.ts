import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  ul {
    border: 1px solid #d3d4d5;
    position: absolute;
    top: 48px;
    left: 32px;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 8px;
    z-index: 80;

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;

      padding: 8px 8px;
      color: #182c1eaa;
      text-decoration: none;
      transition: color 0.2s;
      font: 700 1rem Nunito, sans-serif;

      p {
        font: 400 18px Nunito, sans-serif;
        margin-left: 8px;
      }

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
  }
`;
