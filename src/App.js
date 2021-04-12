import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import Home from './components/Home';
import Nav from './components/nav';


function App() {
  
  
  return (
    <>
      <Home />
      {/* consists of piano note element on the left and a stateful note matrix */}
    </>
  );

}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)


export default App;
