import React, { Component } from 'react';

import axios from '../../axios-instance';

class HotelServices extends Component {
  state = {
    services: []
  }
  
  componentDidUpdate() {
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
      <div key={service.id}>
        <p>{service.name}</p>
        <p>{service.price}</p>
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