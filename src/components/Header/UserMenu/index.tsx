import React from 'react';
import { FiBell, FiPower, FiSettings } from 'react-icons/fi';
import { HiUserCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/auth';
import { Container } from './styles';

export default function UserMenu(): JSX.Element {
  const { signOut } = useAuth();
  const [menuVisibility, setMenuVisibility] = React.useState(false);

  const handleClick = (): void => {
    setMenuVisibility(!menuVisibility);
  };
  return (
    <Container>
      <HiUserCircle size={48} onClick={handleClick} />

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
        <Link to={'/profile'}>
          <div>
            <FiSettings size={24} color={'#265e2b'} />
          </div>
          <p>Configurações</p>
        </Link>

        <Link to={'/notifications'}>
          <div>
            <FiBell size={24} color={'#265e2b'} />
          </div>
          <p>Notificações</p>
        </Link>

        <button onClick={signOut}>
          <div>
            <FiPower
              size={24}
              color={'#f44336'}
              style={{ marginRight: '8px' }}
            />
          </div>
          <p>Sair</p>
        </button>
      </ul>
    </Container>
  );
}
