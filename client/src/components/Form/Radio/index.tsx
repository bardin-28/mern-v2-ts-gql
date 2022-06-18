import React, { memo } from 'react';

interface Radio {
  name: string;
  id?: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  value?: any;
  checked?: boolean;
}

const Radio: React.FC<Radio> = memo(
  ({ name, value, disabled, onChange, onBlur, checked, readOnly }) => (
    <input
      type={'radio'}
      id={name}
      value={value}
      name={name}
      readOnly={readOnly}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      checked={checked}
    />
  )
);

Radio.displayName = 'Radio';
export default Radio;
