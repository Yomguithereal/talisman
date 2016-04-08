import React from 'react';

export default function TextInput(props) {
  const {
    value = '',
    placeholder = null,
    error = false,
    onChange = Function.prototype
  } = props;

  return (
    <div>
      <input type="text"
             placeholder={placeholder}
             onChange={onChange}
             value={value} />
      <span className="bar" />
    </div>
  );
};
