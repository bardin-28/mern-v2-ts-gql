import React from 'react';

import { useFormikContext } from 'formik';
import Select from 'react-select';

export interface CustomSelectInterface {
  name: string;
  options: [];
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: never;
  customStyle?: never;
  isSearchable?: boolean;
}

const CustomSelect: React.FC<CustomSelectInterface> = ({
  name,
  placeholder,
  options,
  disabled,
  defaultValue,
  customStyle,
  isSearchable,
}) => {
  const { setFieldValue } = useFormikContext();

  const customStyles = {
    control: (styles: any, { isSelected, isFocused, isDisabled }: any) => ({
      ...styles,
      backgroundColor: isDisabled ? '#F3F6F9' : 'transparent',
      boxShadow: 'transparent',
      borderRadius: 8,
      minHeight: 38,
      border:
        isSelected || isFocused ? '1px solid #69b3ff' : '1px solid #e4e6ef',

      '&:hover': {
        borderColor: '#69b3ff !important',
      },
    }),
    container: (styles: any) => ({ ...styles }),
    option: (styles: any, { isSelected }: any) => ({
      ...styles,
      background: isSelected ? '#3699ff' : '#fff',
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    singleValue: (styles: any) => ({
      ...styles,
      color: '#3F4254',
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: '#b5b5c3 !important',
      fontSize: 13,
      fontWeight: 400,
    }),
    valueContainer: (styles: any) => ({
      ...styles,
      paddingLeft: 14,
      borderRadius: 6,
      maxHeight: '38px !important',
    }),
    menuList: (styles: any) => ({ ...styles }),
  };

  return (
    <>
      <Select
        getOptionLabel={(option: any) => option.label}
        getOptionValue={(option: any) => option.value}
        classNamePrefix={'custom-select'}
        isClearable={false}
        // menuIsOpen={true}
        defaultValue={defaultValue}
        isDisabled={disabled}
        placeholder={placeholder}
        options={options}
        isSearchable={isSearchable}
        styles={customStyle ? customStyle : customStyles}
        onChange={(value) => setFieldValue(name, value)}
      />
    </>
  );
};

export default CustomSelect;
