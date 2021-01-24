import React from 'react';

import { Container, ProfileContainer } from './styles';
import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Header />
      <ProfileContainer>
        <h1>
          Olá {user.username}! <br />
          Está página está em construção!
        </h1>
      </ProfileContainer>
    </Container>
  );
};

export default Profile;
