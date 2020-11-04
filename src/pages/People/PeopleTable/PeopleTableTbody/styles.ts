import styled from 'styled-components';

export const CustomTableCell = styled.div`
  p:first-child {
    display: flex;
    align-items: center;
    font-size: 18px;
    margin-bottom: 4px;
    color: #111;
    span {
      margin-left: 16px;
    }
  }

  p {
    font-size: 14px;
    color: #666;
    display: flex;
    align-items: center;
    strong {
      font-weight: 700;
      margin-left: 32px;
    }
    span {
      margin-left: 8px;
    }
  }
`;

export const Container = styled.tbody`
  tr {
    :hover {
      background: #f3f4f5;
      cursor: pointer;
    }

    td {
      border-bottom: 1px solid #d3d4d5;
      padding: 8px 0;

      a {
        text-decoration: none;
        font-weight: 700;
        color: #245c2b;
        padding: 2px 8px;
        text-align: center;
      }
    }
  }
`;
