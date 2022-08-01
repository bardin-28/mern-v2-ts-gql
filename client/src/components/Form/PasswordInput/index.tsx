import React, { useState } from 'react';

import cn from 'classnames';

//images
import EyeIco from 'assets/images/icons/password-eye.svg';

interface PasswordInput {
  name: string;
  id?: string;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  value?: any;
  icon?: boolean;
}

import styles from './PasswordInput.module.scss';

const PasswordInput: React.FC<PasswordInput> = ({
  name,
  id,
  className,
  disabled,
  placeholder,
  onChange,
  onBlur,
  value,
  readOnly,
  icon = true,
}): any => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={cn(styles.wrapper, { [styles.icon]: icon })}>
      <input
        dir={'ltr'}
        id={id}
        name={name}
        type={passwordShown ? 'text' : 'password'}
        className={`field ${className ? className : ''} `}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        autoCorrect={'off'}
        autoComplete={'off'}
        spellCheck={'false'}
        autoCapitalize={'none'}
      />
      {icon && (
        <div
          className={cn(styles['icon-wrapper'], {
            [styles['icon-show']]: passwordShown,
          })}
          onClick={togglePasswordVisibility}>
          <img src={EyeIco} alt="asd" />
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
