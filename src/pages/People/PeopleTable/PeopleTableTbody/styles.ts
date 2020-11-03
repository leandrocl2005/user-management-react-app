import styled from 'styled-components';

export const Container = styled.tbody`
  tr {
    :hover {
      background: #f3f4f5;
      cursor: pointer;
    }

    td {
      border-bottom: 1px solid #d3d4d5;
      padding: 16px 0;
    }

    td:first-child div.person-name-and-born {
      display: flex;
      span {
        margin-left: 16px;
        display: block;
      }
    }

    td:first-child div.person-more-info {
      padding: 8px 0;
      margin-left: 32px;
      border: 1px solid #d3d4d5;
      padding-left: 8px;
      margin-top: 16px;
      max-width: 250px;
      border-radius: 8px;
    }

    p {
      margin: 8px;
    }

    div.btn-update-people {
      display: flex;
      a {
        text-decoration: none;
        background-color: #245c2b;
        color: white;
        padding: 2px 8px;
        border-radius: 8px;
        width: 100%;
        text-align: center;
      }

      margin: 0 8px;

      :hover {
        cursor: pointer;
      }
    }
  }
`;
