import React, { memo } from 'react';

import './TextArea.scss';

const TextArea = memo(
  ({
    name,
    id,
    className,
    placeholder,
    disabled,
    onChange,
    onBlur,
    value,
    readOnly,
  }) => (
    <textarea
      name={name}
      id={id}
      className={` ${className ? className : ''}`}
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
      dir={'ltr'}
    />
  )
);

TextArea.displayName = 'TextArea';
export default TextArea;
