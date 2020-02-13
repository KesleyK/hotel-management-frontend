import React, { Component } from 'react';

import axios from '../../axios-instance';
import styles from './AddRoom.module.css';

class AddRoom extends Component {
  state = {
    newRoom: {
      number: null,
      dailyRate: null,
      description: ''
    }
  }

  createNewRoom = (event) => {
    event.preventDefault();
    const newRoom = this.state.newRoom
    axios
      .post('/room', newRoom)
      .then(res => {
        this.props.history.replace('/console');
      });
  }

  changeNewRoomState = (event) => {
    const inputAttr = event.target.name;
    const inputAttrValue = event.target.value;
    const newRoom = {...this.state.newRoom};
    newRoom[inputAttr] = inputAttrValue;

    this.setState({ newRoom: newRoom });
  }

  render() {
    return (
      <div className={styles.container}>
        <form onSubmit={this.createNewRoom}>
          <input 
            placeholder="Room Number" 
            name="number" 
            type="number"
            min="0"
            onChange={this.changeNewRoomState} />
          <input 
            placeholder="Daily Rate" 
            name="dailyRate" 
            step=".1"
            min="0"
            type="number"
            onChange={this.changeNewRoomState} />
          <input 
            placeholder="Description" 
            name="description" 
            type="text"
            onChange={this.changeNewRoomState} />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

export default AddRoom;