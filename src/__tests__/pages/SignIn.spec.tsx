import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedUseSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('../../hooks/toast', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return {
    useAuth: () => ({
      signIn: mockedUseSignIn,
    })
  }
})

describe("SignIn Page", () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  })

  it("Should be able to sign in", () => {
    const {getByPlaceholderText, getByText} = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const password = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: {
        value: "johnDoe@gmail.com"
      }
    });

    fireEvent.change(password, {
      target: {
        value: "123456"
      }
    });

    fireEvent.click(buttonElement);

    waitFor(() => expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard'));

  });

  it("Should not be able to sign in with wrong email", () => {
    const {getByPlaceholderText, getByText} = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const password = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: {
        value: "not-valid-email"
      }
    });

    fireEvent.change(password, {
      target: {
        value: "123456"
      }
    });

    fireEvent.click(buttonElement);

    waitFor(() => expect(mockedHistoryPush).not.toHaveBeenCalled());
  });

  it("Should be call addToast", () => {
    mockedUseSignIn.mockImplementation(() => {
      throw new Error();
    });

    const {getByPlaceholderText, getByText} = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const password = getByPlaceholderText('Senha');
    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: {
        value: "johnDoe@gmail.com"
      }
    });

    fireEvent.change(password, {
      target: {
        value: "123456"
      }
    });

    fireEvent.click(buttonElement);

    waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error'
        })
      );
    });
  });


});
