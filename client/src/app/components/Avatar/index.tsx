import type { HTMLAttributes } from 'react';
import { User } from '@acme/shared-models';
import clsx from 'clsx';

import { sample } from '../../../utils/sample';

import styles from './index.module.css';

const BackgroundColors = [
  '#ef476f',
  '#ffd166',
  '#06d6a0',
  '#118ab2',
  '#073b4c',
];
type BackgroundColorType = (typeof BackgroundColors)[number];

export type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  user: User;
};

const getInitials = (user: User) => {
  const { name } = user;
  const [firstName, lastName] = name.split(' ');
  const firstLetter = firstName.charAt(0);
  const secondLetter = lastName ? lastName.charAt(0) : '';
  return `${firstLetter}${secondLetter}`;
};

const Avatar = ({ user, className, ...other }: AvatarProps) => {
  const backgroundColor: BackgroundColorType =
    sample(BackgroundColors) ?? BackgroundColors[0];

  return (
    <div
      title={user.name}
      style={{ backgroundColor: backgroundColor }}
      className={clsx(styles['avatar'], className)}
      {...other}
    >
      {getInitials(user)}
    </div>
  );
};

export default Avatar;
