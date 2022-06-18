/*eslint-disable */
import React from 'react';

import { useField, connect } from 'formik';

//components
import TextInput from '../Input';
import CheckBox from '../CheckBox';
import PasswordInput from '../PasswordInput';
import Radio from '../Radio';
import TextArea from '../TextArea';

import CustomSelect from "components/Form/CustomSelect";
import TagsField from "components/Form/TagsField";

interface FormField {
  name: string;
  type: string;
  id?: string;
  placeholder?: string;
  customWrapper?: string;
}

const FormField: React.FC<FormField> = ( props: any ) => {
  const { label, type, name, customWrapper } = props;
  const { status } = props.formik;

  const [field, meta] = useField(props);

  const renderFields = () => {
    switch (type) {
      case 'checkbox':
        return <CheckBox {...field} {...props} />;
      case 'password':
        return <PasswordInput {...field} {...props} />;
      case 'radio':
        return <Radio {...field} {...props} />;
      case 'textarea':
        return <TextArea {...field} {...props} />;
      case 'select':
        return <CustomSelect {...field} {...props} />;
      case 'tags':
        return <TagsField {...field} {...props} />;

      default:
        return <TextInput {...field} {...props} />;
    }
  };

  const classWrapper = `input-field ${
    type === 'checkbox' || type === 'radio' ? 'input-check' : ''
  }`;

  return (
    <>
      <div
        className={
          'field-wrapper' +
          ` ${classWrapper ? classWrapper : ''}` +
          `${(meta.touched && meta.error) || status?.[name] ? ' error' : ''}` +
          ` ${customWrapper ? customWrapper : ''}`
        }>
        {label && (
          <label htmlFor={props?.id || props?.name}>
            <span className={'label-text'}>{label}</span>
          </label>
        )}

        {renderFields()}

        {meta?.touched && meta?.error ? (
          <div className="error">{meta?.error}</div>
        ) : status?.[name] ? (
          <div className="error">{status?.[name]}</div>
        ) : null}
      </div>
    </>
  );
};

export default connect(FormField);
