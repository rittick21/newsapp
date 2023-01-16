
import './App.css';
import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import PropTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  pageSize = 20;
  static defaultProps = {
    mode: 'light'

  }
  static propTypes = {
    mode: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      mode: 'light',
      progress: 0
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
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
      <Router>
      <Navbar toggleMode={this.toggleMode} mode={this.state.mode}/>
      <LoadingBar
        color='rgb(13, 110, 253)'
        progress={this.state.progress}
        height={3}
        // onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route exact path="/" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} mode={this.state.mode} key="general" pageSize = {this.pageSize} country ="in" category ="general"/>}/>
        <Route exact path="/business" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} mode={this.state.mode} key="business" pageSize = {this.pageSize} country ="in" category ="business"/>}/>
        <Route exact path="/sports" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} mode={this.state.mode} key="sports" pageSize = {this.pageSize} country ="in" category ="sports"/>}/>
        <Route exact path="/entertainment" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} mode={this.state.mode} key="entertainment" pageSize = {this.pageSize} country ="in" category ="entertainment"/>}/>
        <Route exact path="/health" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} mode={this.state.mode} key="health" pageSize = {this.pageSize} country ="in" category ="health"/>}/>
        <Route exact path="/science" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} mode={this.state.mode} key="science" pageSize = {this.pageSize} country ="in" category ="science"/>}/>
        <Route exact path="/technology" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} mode={this.state.mode} key="technology" pageSize = {this.pageSize} country ="in" category ="technology"/>}/>
      </Routes>
      </Router>
      </div>
    )
  }
}
// render() method is the method of component class which is used to display the component in dom
// If we want to forcefully change the route path then we use exact keyword and If we want to forcefully remount the urll path then we have to use a unique key for this. Because we are changing the page via news api url.
