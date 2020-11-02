import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';
import signUpBackgroundImg from '../../assets/sign-in-background-danielle.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  img {
    width: 340px;
  }

  form {
    margin: 16px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font: 700 1.8rem 'Nunito', sans-serif;
      color: #245c2b;
    }

    a {
      color: #245c2b;
      font: 700 1rem 'Nunito', sans-serif;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &::placeholder {
        color: '#666360';
      }

      &:hover {
        ${shade(0.2, '#faede8')};
      }
    }
  }

  > a {
    color: #245c2b;
    display: block;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      ${shade(0.2, '#faede8')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover;
`;
