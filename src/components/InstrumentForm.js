/*
STATUS UPDATE
In the process of attempting to switch the functionality of the InstrumentForm into Hooks within
PianoRolljs...
Current status: "Object" unidentified upon switching to different instrument. 
We could be very close to having it figured out...
Need help from someone who knows React a little bit better.
Upon successful implementation.. Recommend deleting InstrumentForm.js and .css and
Move InstrumentForm into NavSide location...
*/

import React, {Component} from 'react';
import './InstrumentForm.css';
import PianoRoll from './MusicComponents/PianoRoll.js';
//import Home from './Home.js';

class InstrumentForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: 'polySynth'};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
      //alert(this.state.value);
    }
  
    handleSubmit = (e) => {
      e.preventDefault();
      
      this.setState({
        value: this.state.value
      });
      alert('You changed to: ' + this.state.value);
      this.props.callbackFromInstrumentForm(this.state.value);
    }
  
    render() {
      return (
        <div className = "something">
          <div className = "instrumentChanger">
            <form onSubmit={this.handleSubmit}>
              <label>
                <select value ={this.state.value} onChange={this.handleChange}>
                  <option value="polySynth">polySynth</option>
                  <option value="amSynth">amSynth</option>
                </select>
              </label>
              
              <input type="submit" value="Apply" />
            </form>
          </div>
          {/*<PianoRoll instrument = {this.state.value} />*/}
          {/*<Home value = {this.state.value} />*/}
        </div>
      );
    }
  }

export default InstrumentForm