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

export const ProfessionalServicesItem = styled.div`
  height: 200px;
  width: 320px;
  background: #fffffe;
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
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 16px;
  border-bottom: 1px solid #d3d4d5;

  div + div {
    margin-left: 16px;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 4px;
  }

  p {
    color: #777;
  }
`;

export const CardBody = styled.div`
  margin-top: 16px;
  h4 {
    font-weight: 700;
    font-size: 14px;
    color: #555;
    margin-bottom: 4px;
  }
  p {
    color: #999;
    font-size: 12px;
  }
`;
