/* eslint-disable @typescript-eslint/ban-types */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@CasaDanielle:token');
    const user = localStorage.getItem('@CasaDanielle:user');

    if (token && user) {
      api.defaults.headers.authorization = `Token ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    // const response = await api.post('sessions', {
    //  email,
    //  password,
    // });
    const response = await api.post('/login/', {
      username,
      password,
    });

    /* const {user, token} = response.data */
    const { id, token } = response.data;
    const user_response = await api.get(`users/${id}/`);
    const user = user_response.data;

    localStorage.setItem('@CasaDanielle:token', token);
    localStorage.setItem('@CasaDanielle:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Token ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@CasaDanielle:token');
    localStorage.removeItem('@CasaDanielle:user');
    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@CasaDanielle:user', JSON.stringify(user));
      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
