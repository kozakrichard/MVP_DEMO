import React, { useState } from 'react'
import "./nav.css";
import logo from '../sources/Nightingale.png'



//fas fa-play
//fas fa-pause
const Nav = (props) => {

    return (
        <>
            <div className='NavContainer'>
                <img className='Logo' alt="logo" src={logo} />
                <h1 className='nameLogo'>Nightingale</h1>
                <button class="playbtn" onClick={() => {
                    props.setPlay(!props.play);
                    if (props.play === true) {
                        // call clearColLabel()
                        // call setCurrentStepIndex(-1)
                    }
                }}>
                    {!props.play ? 'Play' : 'Stop'}
                </button>
                <div className="BPMwrapper">
                    <button onClick={props.decrement10} className="bpmBtn10">-10</button>
                    <button onClick={props.decrement} className="bpmBtn">-</button>
                    {/*<div className="BPMcount" ><span contenteditable="true">{props.bpm}</span> bpm</div>*/}
                    <div className="BPMcount" >{props.bpm} bpm</div>
                    <button onClick={props.increment} className="bpmBtn">+</button>
                    <button onClick={props.increment10} className="bpmBtn10">+10</button>
                </div>
                <button className="generateBtn" onClick={props.sendMitty}>Download</button>
            </div>
        </>
    )
}

export default Nav
