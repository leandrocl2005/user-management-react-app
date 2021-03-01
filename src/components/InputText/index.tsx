import React, { InputHTMLAttributes } from 'react';

import FieldContainer from "../FieldContainer";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  input_id: string;
  name: string;
  label: string;
}

const InputText: React.FC<InputTextProps> = ({
  input_id,
  name,
  label
}) => {
  return (
    <FieldContainer>
      <label htmlFor={input_id}>{label}</label>
      <input
        id={input_id}
        name={name}
      />
    </FieldContainer>
  )
}

export default InputText;

