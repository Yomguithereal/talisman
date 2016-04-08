import React from 'react';

export default function TextInput(props) {
  const {
    value = '',
    placeholder = null,
    status = 'default',
    onChange = Function.prototype
  } = props;

  let className = 'bar';

  if (status === 'error')
    className += ' error';
  else if (status === 'success')
    className += ' success';

  return (
    <div>
      <input type="text"
             placeholder={placeholder}
             onChange={onChange}
             value={value}
             className={status} />
      <span className={className} />
    </div>
  );
};
