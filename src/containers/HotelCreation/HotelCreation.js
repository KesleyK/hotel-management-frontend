import React, { Component } from 'react';

import axios from '../../axios-instance';
import { setToken, removeToken } from '../../util/jwtAuth';
import styles from './HotelCreation.module.css'

class HotelCreation extends Component {
  state = {
    hotels: [],
    newHotel: {
      name: '',
      local: '',
      number: ''
    },
    selectedHotelId: null
  }

  componentDidMount() {
    removeToken();
    axios
      .get('/hotels')
      .then((res) => {
        this.setState({
          hotels: res.data
        });
      });
  }

  createHotel = (event) => {
    event.preventDefault();
    const newHotel = this.state.newHotel;
    axios
      .post('/hotel', newHotel)
      .then(res => {
        this.setState(prevState => {
          const hotels = [...prevState.hotels];
          hotels.push(res.data);

          return {
            ...prevState,
            hotels
          }
        });
      })
  }

  hotelDataChanged = (event) => {
    const hotelAttr = event.target.name;
    const hotelAttrValue = event.target.value;
    const newHotel = { ...this.state.newHotel };
    newHotel[hotelAttr] = hotelAttrValue;

    this.setState({ newHotel: newHotel });
  }

  selectHotelId = (id) => {
    this.setState({ selectedHotelId: id });
  }

  goToConsoleHandler = () => {
    axios
      .post('/hotel/' + this.state.selectedHotelId)
      .then(response => {
        return setToken(response.data);
      })
      .then(() => {
        this.props.history.replace('/console');
      });
  }

  render() {
    const disabledBtn = this.state.selectedHotelId === null;
    const hotelsList = this.state.hotels.map(hotel => {
      const rowStyle = [styles.row];
      if (hotel.id === this.state.selectedHotelId) {
        rowStyle.push(styles.active);
      }

      return (
        <div
          key={hotel.id}
          onClick={this.selectHotelId.bind(this, hotel.id)}
          className={rowStyle.join(' ')}>
          <input value={hotel.name} readOnly />
          <input value={hotel.local} readOnly />
          <input value={hotel.number} readOnly />
        </div>
      );
    });

    return (
      <div className={styles.holder}>
        <div className={styles.table}>
          <div className={styles.row}>
            <label>Hotel</label>
            <label>Local</label>
            <label>Telephone</label>
          </div>
          {hotelsList}
        </div>

        <div className={styles.settings}>
          <div className={styles.settingsLeft}>
            <h2>Creating a new one</h2>
            <form onSubmit={this.createHotel}>
              <input placeholder="Name" name="name" onChange={this.hotelDataChanged} />
              <input placeholder="Local" name="local" onChange={this.hotelDataChanged} />
              <input placeholder="Telephone" name="number" onChange={this.hotelDataChanged} />
              <button type={"submit"}>Add</button>
            </form>
          </div>
          <div className={styles.settingsRight}>
            <button disabled={disabledBtn} onClick={this.goToConsoleHandler}>Go to console</button>
          </div>
        </div>
      </div>
    );
  }
}

export default HotelCreation;