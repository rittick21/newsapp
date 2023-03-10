import React, { Component } from 'react';
import loading from './loading.gif';

export class Spinner extends Component {
  render() {
    return (
      <div className='center'>
        <img className="my-3" src={loading} alt="spinner" />
      </div>
    )
  }
}

export default Spinner
