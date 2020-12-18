import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const CheckinGallery = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin: 0px 16px 0 16px;
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

  p {
    color: #777;
    strong {
      color: #111;
      font-weight: 700;
    }
  }

  a {
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
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
