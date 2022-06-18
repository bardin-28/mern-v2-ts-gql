import React, { useState } from 'react';

//images
import EyeBlue from 'assets/images/icons/password-eye-blue.svg';
import Eye from 'assets/images/icons/password-eye.svg';

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
}) => {
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="input-password-wrapper">
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
        <div className="icon-wrapper">
          <img
            alt="show-pass"
            className={passwordShown ? 'hide-icon' : ''}
            src={Eye}
            onClick={togglePasswordVisibility}
          />
          <img
            alt="hide-pass"
            className={passwordShown ? '' : 'hide-icon'}
            src={EyeBlue}
            onClick={togglePasswordVisibility}
          />
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
