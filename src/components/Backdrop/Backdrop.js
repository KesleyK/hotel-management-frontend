import React from 'react';

import styles from './Backdrop.module.css';

const Backdrop = (props) => (
  <div className={styles.Backdrop}>
    {props.children}
  </div>
);

export default Backdrop;