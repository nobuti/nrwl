import { Ticket } from '@acme/shared-models';
import clsx from 'clsx';
import { ReactNode, useState } from 'react';

import styles from './index.module.css';

type ToggleProps = {
  children: ReactNode;
  onChange: (active: boolean) => void;
};

const Toggle = ({ children, onChange }: ToggleProps) => {
  const [active, update] = useState(false);

  const clickHandler = () => {
    update(!active);
    onChange(!active);
  };

  const derivedStyles = clsx(styles['toggle'], {
    [styles['active']]: active,
  });

  return (
    <button type="button" onClick={clickHandler} className={derivedStyles}>
      {children}
    </button>
  );
};

export default Toggle;
