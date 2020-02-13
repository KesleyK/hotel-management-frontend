import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

const Navigation = (props) => {
  return (
    <ul className={styles.Navigation}>
      <li>
        <NavLink
          to={props.match.path}
          exact
          activeClassName={styles.active}
        >Rooms</NavLink>
      </li>
      <li>
        <NavLink
          to={props.match.path + '/add-room'}
          activeClassName={styles.active}
        >Add Room</NavLink>
      </li>
      <li>
        <NavLink
          to={props.match.path + '/services'}
          activeClassName={styles.active}
        >Services</NavLink>
      </li>
      <li>
        <NavLink
          to={props.match.path + '/add-service'}
          activeClassName={styles.active}
        >Add Service</NavLink>
      </li>
    </ul>
  );
}

export default Navigation;