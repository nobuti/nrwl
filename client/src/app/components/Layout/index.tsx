import { HTMLAttributes } from 'react';
import clsx from 'clsx';

import Header from '../Header';

import styles from './index.module.css';

type LayoutProps = HTMLAttributes<HTMLDivElement>;

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <main className={clsx(className, styles['container'])}>
      <Header />
      <section className={styles['content']}>{children}</section>
    </main>
  );
};

export default Layout;
