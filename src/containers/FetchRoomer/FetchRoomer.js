import React, { Component } from 'react';

import axios from '../../axios-instance';
import Form from '../../components/Form/Form';
import styles from './FetchRoomer.module.css'

class FetchRoomer extends Component {
  state = {
    roomerCpf: null,
    fetchedUser: {}
  }

  onChangeRoomerCpfHandler = (event) => {
    const roomerCpf = event.target.value;
    this.setState({ roomerCpf: roomerCpf });
  }

  onFetchUserHandler = (event) => {
    event.preventDefault();
    const roomerCpf = this.state.roomerCpf;
    axios
      .get('/roomer/' + roomerCpf)
      .then(res => {
        this.setState({ fetchedUser: res.data })
      });
  }

  render() {
    let fetchedUser = null;
    if (this.state.fetchedUser.error) {
      fetchedUser = (
        <div className={styles.error}><p>{this.state.fetchedUser.error}</p></div>
      );
    } 
    if (this.state.fetchedUser.cpf) {
      console.log(this.state.fetchedUser);
      fetchedUser = (
        <div className={styles.container}>
          <p><strong>Name:</strong> {this.state.fetchedUser.name}</p>
          <p><strong>At Room:</strong> {this.state.fetchedUser.atRoom}</p>
          <p><strong>Check In:</strong> {new Date(this.state.fetchedUser.checkIn).toLocaleDateString()}</p>
          <p><strong>Check Out:</strong> {new Date(this.state.fetchedUser.checkOut).toLocaleDateString()}</p>
          <p><strong>Daily Costs:</strong> R${this.state.fetchedUser.dailyCosts}</p>
          <p><strong>Services Costs:</strong> R${this.state.fetchedUser.servicesCosts}</p>
        </div>
      );
    }

    return (
      <React.Fragment>
        <Form submitted={this.onFetchUserHandler}>
          <input
            type="number"
            name="roomerCpf"
            placeholder="Roomer CPF"
            onChange={this.onChangeRoomerCpfHandler} />
          <button type="submit">Fetch Roomer</button>
        </Form>

        {fetchedUser}
      </React.Fragment>
    );
  }
}

export default FetchRoomer;