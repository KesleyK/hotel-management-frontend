import React, { Component } from 'react';

import Form from '../../components/Form/Form';
import axios from '../../axios-instance';

class AddService extends Component {
  state = {
    newService: {
      name: '',
      price: null
    }
  }

  onAddServiceHandler = (event) => {
    event.preventDefault();
    
    const newService = this.state.newService;
    axios
      .post('/service', newService)
      .then(res => {
        this.props.history.push('/console/services');
      });
  }

  onChangeInputHandler = (event) => {
    const newService = { ...this.state.newService };
    const eventAttr = event.target.name;
    const eventAttrValue = event.target.value;
    newService[eventAttr] = eventAttrValue;

    this.setState({ newService: newService });
  }

  render() {
    console.log(this.props);
    return (
      <Form submitted={this.onAddServiceHandler}>
        <input
          placeholder="Service Name"
          name="name"
          type="text"
          onChange={this.onChangeInputHandler} />
        <input
          placeholder="Service Price"
          name="price"
          step=".1"
          min="0"
          type="number"
          onChange={this.onChangeInputHandler} />
        <button type="submit">Add</button>
      </Form>
    );
  }
}

export default AddService;