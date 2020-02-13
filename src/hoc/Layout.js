import React, { Component } from 'react';

import axios from '../axios-instance';
import { Switch, Route } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import Rooms from '../containers/Rooms/Rooms';
import AddRoom from '../containers/AddRoom/AddRoom';
import styles from './Layout.module.css';

class Layout extends Component {
  state = {
    hotelData: {}
  }

  componentDidMount() {
    axios
      .get('/hotel')
      .then(res => {
        this.setState({
          hotelData: res.data
        });
      });
  }

  render() {
    return (
      <div className={styles.Layout}>
        <Navigation {...this.props} />

        <div className={styles.container}>
          <div className={styles.hotelData}>
            <p><strong>Name: </strong>{this.state.hotelData.name}</p>
            <p><strong>Local: </strong>{this.state.hotelData.local}</p>
            <p><strong>Number: </strong>{this.state.hotelData.number}</p>
          </div>
          <main className={styles.content}>
            <Switch>
              <Route path={this.props.match.path} exact component={Rooms} />
              <Route path={this.props.match.path + '/add-room'} exact component={AddRoom} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default Layout;