import { useLocation, Link } from 'react-router-dom';
import styles from './index.module.css';

const HOME = '/';

const Header = () => {
  const { pathname } = useLocation();

  console.log('pathname', pathname);

  return (
    <header className={styles['header']}>
      <h1 className={styles['title']}>Ticketing App</h1>
      <div className={styles['action']}>
        {pathname === HOME ? (
          <Link to="/new">New ticket</Link>
        ) : (
          <Link to="/">Close</Link>
        )}
      </div>
    </header>
  );
};

export default Header;
