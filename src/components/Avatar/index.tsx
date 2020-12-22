import React from 'react';

import { Container } from './styles';

import avatar from '../../assets/avatar.png';

interface AvatarProps {
  src: string;
  alt: string;
}

const Avatar: React.FC<AvatarProps> = ({ children, src, alt, ...rest }) => (
  <Container {...rest}>
    <img src={src || avatar} alt={alt || 'Nenhuma foto ainda'} />
    {children}
  </Container>
);

export default Avatar;
