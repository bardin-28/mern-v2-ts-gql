import React, { memo, useState } from 'react';

import { useFormikContext } from 'formik';

import styles from './TagsField.module.scss';

interface TagsField {
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
  bottomLabel?: any;
}

const TagsField: React.FC<TagsField> = memo(
  ({ name, id, className, disabled, placeholder, bottomLabel, readOnly }) => {
    const { setFieldValue, values }: any = useFormikContext();
    const [tags, setTags]: any = useState([]);
    const [clearValue, setClearValue] = useState('');

    const handleKeyDown = (event) => {
      if (event.key !== 'Enter' || event.keyCode !== 13) return;
      let { value }: any = event.target;
      if (!value?.trim()) return;

      // eslint-disable-next-line
      value = value?.replaceAll('"', '\"').replaceAll('\'', '\'');

      setTags([...tags, value]);
      setFieldValue(name, [...tags, value]);
      setClearValue('');
    };

    const currentKey: string | any = Object.keys(values).find(
      (item) => item === name
    );

    const handleDeleteTag = (index) => {
      setTags(tags?.filter((element, i) => i !== index));
      setFieldValue(
        name,
        tags?.filter((element, i) => i !== index)
      );
    };

    return (
      <>
        <div className={styles.wrapper}>
          {values?.[currentKey]?.map((item, index) => (
            <span key={index} className={styles.tag}>
              {item}
              <span
                className={styles.close}
                onClick={() => handleDeleteTag(index)}>
                &times;
              </span>
            </span>
          ))}
          <input
            type={'text'}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            id={id}
            name={name}
            readOnly={readOnly}
            value={clearValue}
            disabled={disabled}
            className={`field ${className ? className : ''}`}
            onChange={(event) => setClearValue(event?.target?.value)}
            autoComplete={'off'}
            autoCorrect={'off'}
            spellCheck={'false'}
            autoCapitalize={'none'}
            dir={'ltr'}
          />
        </div>
        {bottomLabel && <p className={styles['bottom-label']}>{bottomLabel}</p>}
      </>
    );
  }
);

TagsField.displayName = 'TagsField';

export default TagsField;
