import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer'
import RouteDom from './Router/RouteDom'

class App extends React.Component {
  render(){
    return (
      <>
        <Header></Header>
        <RouteDom></RouteDom>
        <Footer></Footer>
      </>
    );
  }
}



export default App;
