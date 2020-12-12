import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
  column-gap: 16px;
  row-gap: 16px;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #d3d4d5;
  margin: 16px 32px;
  border-radius: 8px;
  padding: 8px 16px;

  a {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #b8d866;
    cursor: pointer;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
    text-decoration: none;
  }

  p {
    color: #777;
    strong {
      color: #111;
      font-weight: 700;
    }
  }
`;

export const SearchInput = styled.form`
  border: 1px solid #d3d4d5;
  width: 200px;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  input {
    width: 100%;
    border: none;
    padding-left: 8px;
    color: #333;

    :-webkit-autofill,
    :-webkit-autofill:hover,
    :-webkit-autofill:focus,
    :-webkit-autofill:active {
      transition: background-color 5000s ease-in-out 0s;
    }
  }

  button {
    background: #fff;
    border: none;
    border-radius: inherit;
    display: flex;
    align-items: center;
  }
`;

export const HomeServicesGallery = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin: 0px 16px 0 16px;
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
    border: 1px solid #efefef;
    border-radius: 8px;
  }
`;

export const Avatar = styled.div`
  img {
    width: 64px;
    height: 64px;
    display: cover;
    border-radius: 50%;
    border: 1px solid #d3d4d5;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
  }
`;
