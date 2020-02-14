import React, { Component } from 'react';

import axios from '../../axios-instance';
import Backdrop from '../../components/Backdrop/Backdrop';
import Modal from '../../components/Modal/Modal';
import Form from '../../components/Form/Form';
import styles from './HotelServices.module.css'

class HotelServices extends Component {
  state = {
    services: [],
    selectedServicePrice: 0,
    modal: false
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

  changeSelectedServicePrice = (price) => {
    this.setState({ selectedServicePrice: price });
    this.toggleModalState();
  }

  toggleModalState = () => {
    this.setState({ modal: !this.state.modal });
  }

  submitAddToRoomer = (event) => {
    event.preventDefault();
    const roomerCpf = event.target.children[0].value;
    const servicePrice = this.state.selectedServicePrice;

    axios
      .post('/roomer/add-service/' + roomerCpf, { servicePrice })
      .then(res => {
        this.toggleModalState();
      });
  }

  render() {
    let modal = null;
    if (this.state.modal) {
      modal = (
        <Backdrop>
          <Modal close={this.toggleModalState}>
            <Form submitted={this.submitAddToRoomer}>
              <input
                type="number"
                name="roomerCpf"
                placeholder="Roomer CPF"
                onChange={null} />
              <button type="submit">Add to Roomer</button>
            </Form>
          </Modal>
        </Backdrop>
      );
    }

    const services = this.state.services.map(service => (
      <div key={service.id} className={styles.HotelService}>
        <p>{service.name} - R${service.price}</p>
        <button
          onClick={this.changeSelectedServicePrice.bind(this, service.price)}>
          Add to Roomer &rarr;
        </button>
      </div>
    ));

    return (
      <div>
        {modal}
        {services}
      </div>
    );
  }
}

export default HotelServices;