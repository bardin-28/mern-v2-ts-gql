import React, { memo, MouseEventHandler } from 'react';

interface CustomButtonProps {
  appearence?: string;
  text: string;
  type: 'submit' | 'button' | 'reset';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  icon?: string | any;
}

import cn from 'classnames';

import styles from './CustomButton.module.scss';

const CustomButton = memo(
  ({
    appearence = '',
    text,
    type,
    onClick,
    className,
    icon,
  }: CustomButtonProps) => (
    <button
      type={type}
      className={cn(styles.wrapper, styles[appearence], className)}
      onClick={onClick}>
      {text}
      {icon}
    </button>
  )
);

CustomButton.displayName = 'CustomButton';
export default CustomButton;
