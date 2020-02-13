import React from 'react';

import styles from './Form.module.css';

const Form = (props) => {
  return (
    <div className={styles.container}>
      <form onSubmit={props.submitted}>
        {props.children}
      </form>
    </div>
  );
}

export default Form;