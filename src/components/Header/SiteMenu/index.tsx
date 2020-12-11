import React from 'react';

import { Divider } from '@material-ui/core';

import { FiMenu } from 'react-icons/fi';

import { MdPeople, MdLoyalty, MdLocalDining } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function SiteMenu(): JSX.Element {
  const [menuVisibility, setMenuVisibility] = React.useState(false);

  const handleMenuClick = (): void => {
    setMenuVisibility(!menuVisibility);
  };

  const handleMenuItemClick = (): void => {
    setMenuVisibility(false);
  };

  return (
    <Container>
      <FiMenu
        onClick={handleMenuClick}
        size={48}
        style={{ cursor: 'pointer' }}
      />

      <ul
        style={
          menuVisibility
            ? {
              visibility: 'visible',
              display: 'block',
            }
            : {
              visibility: 'hidden',
              display: 'none',
            }
        }
      >
        <Link to={'/people'} onClick={handleMenuItemClick}>
          <div>
            <MdPeople size={24} color={'#265e2b'} />
          </div>
          <p>Pessoas</p>
        </Link>

        <Divider variant="middle" style={{ marginTop: 8, marginBottom: 8 }} />

        <Link to={'/checkins'} onClick={handleMenuItemClick}>
          <div>
            <MdLoyalty size={24} color={'#265e2b'} />
          </div>
          <p>Check-in's</p>
        </Link>

        <Link to={'/home-services'} onClick={handleMenuItemClick}>
          <div>
            <MdLocalDining size={24} color={'#265e2b'} />
          </div>
          <p>Serviços da casa</p>
        </Link>

        <Divider variant="middle" style={{ marginTop: 8, marginBottom: 8 }} />

        <Link to={'/professional-services'} onClick={handleMenuItemClick}>
          <div>
            <FaUserTie size={24} color={'#b8d866'} />
          </div>
          <p>Serviços profissionais</p>
        </Link>

        <Link to={'/reports'} onClick={handleMenuItemClick}>
          <div>
            <GoGraph size={24} color={'#b8d866'} />
          </div>
          <p>Relatórios</p>
        </Link>
      </ul>
    </Container>
  );
}
