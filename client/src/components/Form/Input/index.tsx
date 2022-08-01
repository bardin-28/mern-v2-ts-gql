import React, { memo } from 'react';

import { useFormikContext } from 'formik';

interface TextInput {
  name: string;
  id: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  readOnly?: boolean;
  value?: any;
}

const TextInput: React.FC<TextInput> = memo(
  ({
    name,
    onChange,
    id,
    className,
    disabled,
    placeholder,
    onBlur,
    readOnly,
    value,
  }) => {
    const { setFieldValue } = useFormikContext();
    return (
      <input
        type={'text'}
        className={`field ${className ? className : ''}`}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        disabled={disabled}
        readOnly={readOnly}
        onChange={(event) => setFieldValue(name, event.target.value)}
        onBlur={onBlur}
        autoComplete={'off'}
        autoCorrect={'off'}
        spellCheck={'false'}
        autoCapitalize={'none'}
        dir={'ltr'}
      />
    );
  }
);

TextInput.displayName = 'TextInput';
export default TextInput;
