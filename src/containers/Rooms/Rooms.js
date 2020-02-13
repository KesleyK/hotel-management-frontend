import React, { Component } from 'react';

import axios from '../../axios-instance';
import styles from './Rooms.module.css'

class Rooms extends Component {
  state = {
    rooms: []
  }

  componentDidMount() {
    axios
      .get('/rooms')
      .then(res => {
        this.setState({ rooms: res.data });
      });
  }

  render() {
    return (
      <div>
        {this.state.rooms.map(room => (
          <div className={styles.Room} key={room.id}>
            <p><strong>Room {room.number}</strong></p>
            <p><strong>Daily Rate: </strong>{room.dailyRate}</p>
            <p><strong>Description: </strong>{room.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Rooms;