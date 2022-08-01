import React, { ChangeEventHandler, FocusEventHandler, memo } from 'react';

import './TextArea.scss';

interface TextAreaProps {
  name: string;
  id: string;
  className: string;
  placeholder: string;
  disabled: boolean;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  value?: string | number;
  readOnly?: boolean;
}

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
  }: TextAreaProps) => (
    <>
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
    </>
  )
);

TextArea.displayName = 'TextArea';
export default TextArea;
