import React, { Component } from 'react';

import axios from '../../axios-instance';
import styles from './HotelServices.module.css'

class HotelServices extends Component {
  state = {
    services: []
  }
  
  componentDidMount() {
    axios
      .get('/services')
      .then(res => {
        this.setState({
          services: res.data
        });
      });
  }

  render() {
    const services = this.state.services.map(service => (
      <div key={service.id} className={styles.HotelService}>
        <p>{service.name} - R${service.price}</p>
      </div>
    ));

    return (
      <div>
        {services}
      </div>
    );
  }
}

export default HotelServices;