import React, { Fragment } from 'react';
import spinner from '../../img/spinner.png';

export default () => (
  <Fragment>
      <img
          src={spinner}
          style={{width: '100px', display: 'block', margin: 'auto'}}
          alt='Loading...'
      />
  </Fragment>
);
