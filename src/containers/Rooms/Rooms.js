import React, { Component } from 'react';

import axios from '../../axios-instance';
import Backdrop from '../../components/Backdrop/Backdrop';
import Modal from '../../components/Modal/Modal';
import Form from '../../components/Form/Form';
import styles from './Rooms.module.css'

class Rooms extends Component {
  state = {
    rooms: [],
    onRent: false,
    roomerData: {
      roomerName: null,
      roomerCpf: null,
      checkIn: null,
      checkOut: null
    },
    selectedRoomToRent: null
  }

  componentDidMount() {
    axios
      .get('/rooms')
      .then(res => {
        this.setState({ rooms: res.data });
      });
  }

  onChangeSelectedRoomToRent = (roomNumber) => {
    this.setState({ selectedRoomToRent: roomNumber });
    this.toggleOnRentHandler();
  }

  onChangeRoomerDataHandler = (event) => {
    const roomerData = { ...this.state.roomerData };
    const roomerAttr = event.target.name;
    const roomerAttrValue = event.target.value;
    roomerData[roomerAttr] = roomerAttrValue;

    this.setState({ roomerData: roomerData });
  }

  onRentRoomHandler = () => {
    const selectedRoomNumber = this.state.selectedRoomToRent;
    const roomerData = this.state.roomerData;

    axios
      .post('/room/rent/' + selectedRoomNumber, roomerData)
      .then(res => {
        this.toggleOnRentHandler();
      });
  }

  toggleOnRentHandler = () => {
    this.eraseRoomerData();
    this.setState(prevState => {
      const onRent = !prevState.onRent;

      return { ...prevState, onRent };
    });
  }

  eraseRoomerData = () => {
    const roomerData = { ...this.state.roomerData };
    for (let key in roomerData) {
      roomerData[key] = null;
    }
    this.setState({ roomerData: roomerData });
  }

  checkoutRoomer = (roomNumber) => {
    axios
      .delete('/room/rent/' + roomNumber)
      .then(res => {
        const updatedRoomData = res.data;
        const rooms = [...this.state.rooms];
        const roomIndex = rooms.findIndex(room => room.id === updatedRoomData.id);
        rooms[roomIndex] = updatedRoomData;

        this.setState({ rooms: rooms });
      });
  }

  render() {
    let modal = null;
    if (this.state.onRent) {
      modal = (
        <Backdrop>
          <Modal close={this.toggleOnRentHandler}>
            <Form submitted={this.onRentRoomHandler}>
              <input
                type="text"
                name="roomerName"
                placeholder="Roomer Name"
                onChange={this.onChangeRoomerDataHandler} />
              <input
                type="number"
                name="roomerCpf"
                placeholder="Roomer CPF"
                onChange={this.onChangeRoomerDataHandler} />
              <label>Check-in:</label>
              <input
                type="date"
                name="checkIn"
                onChange={this.onChangeRoomerDataHandler} />
              <label>Check-out:</label>
              <input
                type="date"
                name="checkOut"
                placeholder="Check-out"
                onChange={this.onChangeRoomerDataHandler} />
              <button type="submit">Rent</button>
            </Form>
          </Modal>
        </Backdrop>
      )
    }
    return (
      <React.Fragment>
        {modal}
        <div className={styles.container}>
          {this.state.rooms.map(room => {
            const rentedUntil = new Date(room.rentedUntil).toLocaleDateString();

            return <div className={styles.Room} key={room.id}>
              <p><strong>Room {room.number}</strong></p>
              <p><strong>Daily Rate: </strong>{room.dailyRate}</p>
              {room.description ? <p><strong>Description: </strong>{room.description}</p> : null}
              {room.rentedUntil ? <p><strong>Rented Until: </strong>{rentedUntil}</p> : null}
              {room.roomerCpf ? <p><strong> Roomer CPF: </strong>{room.roomerCpf}</p> : null}
              <button
                className={styles.rentBtn}
                onClick={this.onChangeSelectedRoomToRent.bind(this, room.number)}
                disabled={room.isRented}>Rent</button>
              <button
                className={styles.checkoutBtn}
                onClick={this.checkoutRoomer.bind(this, room.number)}
                disabled={!room.isRented}>Check-out Roomer</button>
            </div>
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default Rooms;