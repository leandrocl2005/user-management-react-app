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

export const HomeServicesItem = styled.div`
  height: 220px;
  width: 340px;
  background: #fffffe;
  padding: 8px 16px;
  border-radius: 8px;
  margin: 16px 8px;
  padding: 0px 16px;
  position: relative;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: 400ms;

  p {
    font-size: 14px;
  }

  :hover {
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.7);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0px;
  border-bottom: 1px solid #d3d4d5;

  p:first-child {
    font-weight: 700;
    font-size: 14px;
  }

  p:last-child {
    color: #333;
    strong {
      color: #777;
    }
  }
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`;

export const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  flex: 1;
  text-align: center;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  line-height: 24px;

  p {
    border: none;
    border-radius: 8px;
    box-shadow: 1px 1px 2px 1px rgba(24, 44, 30, 0.7);
  }
`;
