import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe("SignIn Page", () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it("Should be able to sign in", () => {
    const {debug} = render(<SignIn />)
    debug();
  });
});


/*
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});*/
