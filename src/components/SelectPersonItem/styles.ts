import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #d3d4d5;
  cursor: pointer;
  transition: 400ms;
  padding: 8px 16px 8px 16px;

  :last-child {
    border-bottom: none;
    border-radius: 0 0 8px 8px;
  }

  :first-child {
    border-radius: 8px 8px 0 0;
  }

  :first-child:last-child {
    border-radius: 8px 8px 8px 8px;
  }

  :hover {
    background: #f3f4f5;
  }
`;
export const Avatar = styled.div`
  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
`;
export const SelectTextContainer = styled.div`
  margin-left: 16px;
  h3 {
    font-size: 12px;
    font-weight: 700;
  }

  p {
    font-size: 10px;
    color: #777;
  }
`;
