import clsx from 'clsx';
import { HTMLAttributes } from 'react';

import styles from './index.module.css';

type SwitchProps = HTMLAttributes<HTMLInputElement> & {
  status: 'on' | 'off';
  loading: boolean;
};

const Swtich = ({ status, onChange, id, loading }: SwitchProps) => {
  const derivedStyles = clsx(styles['switch'], {
    [styles['loading']]: loading,
  });

  return (
    <input
      className={derivedStyles}
      id={id}
      onChange={onChange}
      type="checkbox"
      disabled={loading}
      checked={status === 'on'}
    />
  );
};

export default Swtich;
