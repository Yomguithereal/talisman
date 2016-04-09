import React from 'react';

export default function TextArea(props) {
  const {
    value = '',
    placeholder = null,
    status = 'default',
    onChange = Function.prototype
  } = props;

  let className = 'bar-textarea';

  if (status === 'error')
    className += ' error';
  else if (status === 'success')
    className += ' success';

  return (
    <div>
      <textarea placeholder={placeholder}
                onChange={onChange}
                value={value}
                className={status} />
      <span className={className} />
    </div>
  );
};
