import { shade } from 'polished';
import styled from 'styled-components';

export const Button = styled.div``;

export const Container = styled.div`
  position: relative;
  height: 64px;

  ul {
    border: 1px solid #d3d4d5;
    position: absolute;
    top: 48px;
    left: 16px;
    display: flex;
    flex-direction: column;
    background: #fff;
    z-index: 100;
    border-radius: 8px;

    a {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: start;

      padding: 8px 16px;
      color: #182c1eaa;
      text-decoration: none;
      transition: color 0.2s;
      font: 700 1rem Nunito, sans-serif;

      &:hover {
        color: #182c1e;
      }
      p {
        font: 400 18px Nunito, sans-serif;
        margin-left: 8px;
      }

      &:hover {
        background: ${shade(0.05, '#ffffee')};
        cursor: pointer;
      }
    }
  }
`;
