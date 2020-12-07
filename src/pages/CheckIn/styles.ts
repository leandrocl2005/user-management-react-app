import styled from 'styled-components';

export const Container = styled.div``;

export const CheckinGallery = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin: 64px 16px 0 16px;
`;

export const Nav = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  align-items: center;
  border: 1px solid #d3d4d5;
  margin: 64px 16px 0 16px;
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
  background-color: #335522;
  color: white;
`;

export const CloseCheckinButton = styled.button`
  margin: 8px 0;
  padding: 4px 8px;
  border: none;
  border-radius: 8px;
  background-color: #6b6b6b;
  color: white;
`;

export const CheckinItem = styled.div`
  height: 120px;
  width: 200px;
  background-color: #efefef;
  padding: 8px 16px;
  border-radius: 8px;
  margin: 16px 8px;
  position: relative;

  div {
    position: absolute;
    right: 10px;
    bottom: 10px;
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
