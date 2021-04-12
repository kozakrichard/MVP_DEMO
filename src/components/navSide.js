import React, { useState } from 'react'
import './navSide.css';



const getVol = (vol) =>
{
    return parseInt(vol) + 100;
}

const getPan = (pan) =>
{
    if (pan < 0)
    {
        return "L" + String(Math.abs(pan));
    }
    else if (pan > 0)
    {
        return "R" + String(pan);
    }
        
    else
    {
        return String(pan);
    }
}

const NavSide = (props) => {
    const [inValue, setInValue] = useState(-50);
    const [panValue, setPanValue] = useState(0);

    // if (swidge)
    // {
    //     props.handleVol(-50);
    //     props.handlePan(0);
    //     swidge = false;    
    // }
    

    return (
        <>
            <div className = 'NavSide'>
                <div className = 'sliderContainer'> 
                    <div className = 'range'>
                        <div className ="Vol">Volume: {getVol(String(inValue))}</div>
                        <div className='slide'>
                            <div className = 'field'>
                                <div className= 'value left'>0</div>
                                <input className='slider' 
                                    type="range" 
                                    min ='-100'max='0' 
                                    onChange={(e => {
                                        props.handleVol(e.target.value);
                                        setInValue(e.target.value);
                                    })}
                                    value={inValue}
                                    steps ='1'>
                                </input>
                                <div className= 'value right'>100</div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className = 'sliderContainer two'> 
                    <div className = 'range'>
                        <div className ="Vol">Pan: {getPan(panValue)}</div>
                        <div className='slide'>
                            <div className = 'field'>
                                <div className= 'value left'>L</div>
                                <input className='slider' 
                                    type="range" 
                                    min ='-100'max='100' 
                                    onChange={(e => {
                                        props.handlePan(e.target.value);
                                        setPanValue(e.target.value);
                                    })}
                                    value={panValue}
                                    steps ='1'>
                                </input>
                                <div className= 'value right'>R</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}

export default NavSide;



/*
<div className = 'sliderContainer'> 
    <RangeStepInput
    min={0} max={80}
    defaultValue={props.vol} 
    step={1}
    onChange={e => props.handleVol(e.target.value)}
    />
</div>
*/