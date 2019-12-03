import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import './Roulette.css';
import './App.css';
import Canvas from './pages/Canvas';
import NotFound from './Components/NotFound';
import LoadingDots from './Components/LoadingDots';
require('dotenv').config();

class App extends Component {
  
  state = {
    isLoading: true,
    status: "loading",
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        status: "loaded",
        isLoading: false
      })
    
    }, 1000);
  };

  render () { 
   
    const { isLoading } = this.state;
     
    return (
      isLoading ? 
      <div className='App'>
        <LoadingDots/>
      </div>
      :
      <Switch>
      <Route exact path="/" component={Canvas} />
        <Route path='*' exact={true} component={NotFound} />
      </Switch>
    );
  }
}

export default App;
