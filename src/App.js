
import './App.css';
import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

export default class App extends Component {
  static defaultProps = {
    mode: 'light'
  }
  static propTypes = {
    mode: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      mode: 'light'
    };
  } 
  toggleMode=()=>{
    if(this.state.mode==='light'){
      this.setState({mode: 'dark'});
      document.body.style.backgroundColor= 'rgb(29, 14, 117)';
    }else{
      this.setState({mode: 'light'});
      document.body.style.backgroundColor='white';
    }
  }
  render() {
    return (
      <div>
      <Router>
      <Navbar toggleMode={this.toggleMode} mode={this.state.mode}/>
      <Routes>
        <Route exact path="/" element={<News mode={this.state.mode} key="general" pageSize = {20} country ="in" category ="general"/>}/>
        <Route exact path="/business" element={<News mode={this.state.mode} key="business" pageSize = {20} country ="in" category ="business"/>}/>
        <Route exact path="/sports" element={<News mode={this.state.mode} key="sports" pageSize = {20} country ="in" category ="sports"/>}/>
        <Route exact path="/entertainment" element={<News mode={this.state.mode} key="entertainment" pageSize = {20} country ="in" category ="entertainment"/>}/>
        <Route exact path="/health" element={<News mode={this.state.mode} key="health" pageSize = {20} country ="in" category ="health"/>}/>
        <Route exact path="/science" element={<News mode={this.state.mode} key="science" pageSize = {20} country ="in" category ="science"/>}/>
        <Route exact path="/technology" element={<News mode={this.state.mode} key="technology" pageSize = {20} country ="in" category ="technology"/>}/>
      </Routes>
      </Router>
      </div>
    )
  }
}
// render() method is the method of component class which is used to display the component in dom
// If we want to forcefully change the route path then we use exact keyword and If we want to forcefully remount the urll path then we have to use a unique key for this. Because we are changing the page via news api url.
