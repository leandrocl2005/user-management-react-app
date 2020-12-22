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

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  margin-right: -16px;
  margin-top: -8px;
  margin-bottom: -8px;
  border-radius: 0 8px 8px 0;
  padding: 8px 8px 8px 0;
  width: 48px;
`;

export const AvatarBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
`;

export const CheckinItem = styled.div`
  height: 120px;
  width: 320px;
  background: #fffffe;
  padding: 8px 16px;
  border-radius: 8px;
  margin: 16px 8px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s;
  transition: 400ms;
  display: flex;
  flex-direction: row;

  :hover {
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.7);
  }
`;
