import { HTMLAttributes } from 'react';

import styles from './index.module.css';

type SwitchProps = HTMLAttributes<HTMLInputElement> & {
  status: 'on' | 'off';
};

const Swtich = ({ status, onChange, id }: SwitchProps) => {
  return (
    <input
      className={styles['switch']}
      id={id}
      onChange={onChange}
      type="checkbox"
      checked={status === 'on'}
    />
  );
};

export default Swtich;
