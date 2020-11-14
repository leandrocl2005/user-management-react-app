import React from 'react';

import SiteMenu from './SiteMenu';
import UserMenu from './UserMenu';

import { Container } from './styles';

export default function Header(): JSX.Element {
  return (
    <Container>
      <SiteMenu />
      <UserMenu />
    </Container>
  );
}
