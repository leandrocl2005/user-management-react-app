import styled, { keyframes } from 'styled-components';

export const Container = styled.div``;

export const CheckinGallery = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin: 32px 16px 0 16px;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #d3d4d5;
  margin: 32px 32px 0 32px;
  border-radius: 8px;
  padding: 8px 16px;

  p {
    color: #777;
    strong {
      color: #111;
      font-weight: 700;
    }
  }
`;

export const OpenCheckinButton = styled.button`
  margin: 8px 0;
  padding: 4px 8px;
  border: none;
  border-radius: 8px;
  background-color: #245c2b;
  color: white;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
`;

export const CloseCheckinButton = styled.button`
  margin: 8px 0;
  padding: 4px 8px;
  border: none;
  border-radius: 8px;
  background-color: #414941;
  color: white;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
`;

export const AllCheckinButton = styled.button`
  margin: 8px 0;
  padding: 4px 8px;
  border: none;
  border-radius: 8px;
  background-color: #c68a12;
  color: white;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const CheckinItem = styled.div`
  height: 160px;
  width: 200px;
  background-color: #efefef;
  padding: 8px 16px;
  border-radius: 8px;
  margin: 16px 8px;
  position: relative;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s;

  div {
    position: absolute;
    left: 10px;
    bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: 180px;
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
