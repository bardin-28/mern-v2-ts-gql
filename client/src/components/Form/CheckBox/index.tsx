import React, { memo } from 'react';

interface CheckBox {
  name: string;
  id?: string;
  value?: any;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readOnly?: boolean;
}

const CheckBox: React.FC<CheckBox> = memo(
  ({ name, value, disabled, id, onChange, onBlur, readOnly }) => (
    <input
      type={'checkbox'}
      id={id}
      name={name}
      onChange={onChange}
      disabled={disabled}
      onBlur={onBlur}
      checked={value}
      readOnly={readOnly}
    />
  )
);

CheckBox.displayName = 'CheckBox';
export default CheckBox;
