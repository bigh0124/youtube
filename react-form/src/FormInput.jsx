import React from "react";

const FormInput = (props) => {
  const { error, id, onChange, value, label, ...inputProps } = props;
  return (
    <div>
      <label>{label}</label>
      <input {...inputProps} onChange={onChange} value={value} required={true} />
      <span style={{ color: "red", display: "none" }}>{error}</span>
    </div>
  );
};

export default FormInput;
