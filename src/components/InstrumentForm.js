import React, {Component} from 'react';
import './InstrumentForm.css';
//import PianoRoll from './MusicComponents/PianoRoll';
import PianoRoll from './MusicComponents/PianoRoll.js'
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
          {/*<PianoRoll value = {this.state.value} />*/}
          {/*<Home value = {this.state.value} />*/}
        </div>
      );
    }
  }

export default InstrumentForm