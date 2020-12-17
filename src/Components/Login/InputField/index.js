import React, { memo } from 'react';
import b from 'b_';
import './InputField.sass';

const InputField = (props) => {
  const container = 'input-field-container';

  return (
    <div className={container}>
      <label className={b(container, 'label')} htmlFor="input-field">
        {props.label}
      </label>
      <input
        placeholder={props.placeholder}
        className={b(container, 'input-field')}
        id={'input-field'}
        type={props.type}
      />
    </div>
  );
};

export default memo(InputField);
