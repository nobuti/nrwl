import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './index.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: ButtonProps) => {
  return (
    <button className={clsx(props.className, styles['button'])} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
