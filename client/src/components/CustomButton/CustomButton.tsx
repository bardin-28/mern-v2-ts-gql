import React, { memo, MouseEventHandler } from 'react';

interface CustomButtonProps {
  text: string;
  type: 'submit' | 'button' | 'reset';
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

import cn from 'classnames';

import styles from './CustomButton.module.scss';

const CustomButton = memo(
  ({ text, type, onClick, className }: CustomButtonProps) => (
    <button
      type={type}
      className={cn(styles.wrapper, className)}
      onClick={onClick}>
      {text}
    </button>
  )
);

CustomButton.displayName = 'CustomButton';
export default CustomButton;
