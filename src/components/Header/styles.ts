import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.4);
  width: 100vw;
  position: relative;
  height: 64px;
  padding: 0 16px;

  display: grid;
  grid-template-columns: auto 48px;
  justify-content: space-between;
  align-items: center;

  ul {
    border: 1px solid #d3d4d5;
    position: absolute;
    top: 48px;
    left: 8px;
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 8px;

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
