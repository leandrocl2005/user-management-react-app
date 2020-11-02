import React from 'react';
import { Divider } from '@material-ui/core';

import { FiMenu } from 'react-icons/fi';

import { MdPeople, MdLoyalty, MdLocalDining } from 'react-icons/md';
import { FaUserTie } from 'react-icons/fa';
import { GoGraph } from 'react-icons/go';

import { Link } from 'react-router-dom';
import { Button, Container } from './styles';

export default function CustomizedMenus(): JSX.Element {
  const [menuVisibility, setMenuVisibility] = React.useState(false);

  const handleClick = (): void => {
    setMenuVisibility(!menuVisibility);
  };

  return (
    <Container>
      <Button>
        <FiMenu
          onClick={handleClick}
          size={48}
          style={{ marginRight: '16px', cursor: 'pointer' }}
        />
      </Button>
      <ul
        style={
          menuVisibility
            ? {
                visibility: 'visible',
              }
            : {
                visibility: 'hidden',
              }
        }
      >
        <Link to={'/people'}>
          <div>
            <MdPeople size={24} color={'#265e2b'} />
          </div>
          <p>Pessoas</p>
        </Link>

        <Link to={'/reception'}>
          <div>
            <MdLoyalty size={24} color={'#265e2b'} />
          </div>
          <p>Recepção</p>
        </Link>

        <Link to={'/home-services'}>
          <div>
            <MdLocalDining size={24} color={'#265e2b'} />
          </div>
          <p>Serviços da casa</p>
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