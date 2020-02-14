import React from 'react';

import styles from './Model.module.css'

const Modal = (props) => (
  <div className={styles.Model}>
    <span className={styles.closeBtn} onClick={props.close}>&#x2716;</span>
    {props.children}
  </div>
);

export default Modal;