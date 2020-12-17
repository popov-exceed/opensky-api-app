import React, { memo } from 'react';
import b from 'b_';
import './Item.sass';

const Item = (props) => {
  const container = 'item-container';

  const time = new Date();
  time.setSeconds(props.time);

  return (
    <div className={'row ' + container}>
      <p className={b(container, 'element')}>{props.airport}</p>
      <p className={b(container, 'element')}>
        {time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) + ' CST'}
      </p>
      <p className={b(container, 'element')}>{props.arriving}</p>
      <p className={b(container, 'element', { last: true })}>{props.departing}</p>
    </div>
  );
};

export default memo(Item);
