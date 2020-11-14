import React from 'react';

import { Divider } from '@material-ui/core';

import { FiLogOut, FiMenu } from 'react-icons/fi';

import { MdPeople, MdLoyalty, MdLocalDining } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function SiteMenu(): JSX.Element {
  const [menuVisibility, setMenuVisibility] = React.useState(false);

  const handleClick = (): void => {
    setMenuVisibility(!menuVisibility);
  };

  return (
    <Container>
      <FiMenu onClick={handleClick} size={48} style={{ cursor: 'pointer' }} />

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
        <Link to={'/people'}>
          <div>
            <MdPeople size={24} color={'#265e2b'} />
          </div>
          <p>Pessoas</p>
        </Link>

        <Divider variant="middle" style={{ marginTop: 8, marginBottom: 8 }} />

        <Link to={'/checkin'}>
          <div>
            <MdLoyalty size={24} color={'#265e2b'} />
          </div>
          <p>Check-in</p>
        </Link>

        <Link to={'/home-services'}>
          <div>
            <MdLocalDining size={24} color={'#265e2b'} />
          </div>
          <p>Serviços da casa</p>
        </Link>

        <Link to={'/checkout'}>
          <div>
            <FiLogOut size={24} color={'#f44336'} />
          </div>
          <p>Check-out</p>
        </Link>

        <Divider variant="middle" style={{ marginTop: 8, marginBottom: 8 }} />

        <Link to={'/professional-services'}>
          <div>
            <FaUserTie size={24} color={'#b8d866'} />
          </div>
          <p>Serviços profissionais</p>
        </Link>

        <Link to={'/reports'}>
          <div>
            <GoGraph size={24} color={'#b8d866'} />
          </div>
          <p>Relatórios</p>
        </Link>
      </ul>
    </Container>
  );
}
