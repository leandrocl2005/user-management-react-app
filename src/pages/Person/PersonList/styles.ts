import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const CardBody = styled.div`
  margin: 16px;

  h3 {
    font-size: 14px;
    font-weight: 700;
  }

  h4 {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 2px;
  }

  p {
    font-size: 8px;
    margin-top: 8px;
    color: #777;
  }
`;

export const PlusButtonContainer = styled.a`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #b8d866;
  cursor: pointer;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
  transition: 400ms;

  :hover {
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.7);
  }
`;

export const PersonItem = styled.div`
  height: 120px;
  width: 320px;
  background: #fffffe;
  padding: 8px 16px;
  border-radius: 8px;
  margin: 16px 8px;
  position: relative;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  transition: 400ms;

  :hover {
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.7);
  }
`;
