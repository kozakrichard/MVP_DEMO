import React, { useState, useEffect, useRef } from 'react';
import { Song, Track, Instrument } from 'reactronica';
import './PianoRoll.css';
import axios from 'axios';
import {useForm} from 'react-hook-form';
import * as Tone from 'tone';
import { Midi } from '@tonejs/midi';


export default function PianoRoll(props) {

    const [data, setState] = useState({data: {instrument: "monoSynth"}});
    const {register, handleSubmit} = useForm();

    var previousStepIndex = useRef(1);
    const numOfCol = useRef(0);
    const numOfCells = useRef(0);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const notes = ['C8' , 'B7' , 'A#7' , 'A7' , 'G#7' , 'G7' , 'F#7' , 'F7' , 'E7' , 'D#7' , 'D7' , 'C#7' , 'C7' , 'B6' , 'A#6' , 'A6' , 'G#6' , 'G6' , 'F#6' , 'F6' , 'E6' , 'D#6' , 'D6' , 'C#6' , 'C6' , 'B5' , 'A#5' , 'A5' , 'G#5' , 'G5' , 'F#5' , 'F5' , 'E5' , 'D#5' , 'D5' , 'C#5' , 'C5' , 'B4' , 'A#4' , 'A4' , 'G#4' , 'G4' , 'F#4' , 'F4' , 'E4' , 'D#4' , 'D4' , 'C#4' , 'C4' , 'B3' , 'A#3' , 'A3' , 'G#3' , 'G3' , 'F#3' , 'F3' , 'E3' , 'D#3' , 'D3' , 'C#3' , 'C3' , 'B2' , 'A#2' , 'A2' , 'G#2' , 'G2' , 'F#2' , 'F2' , 'E2' , 'D#2' , 'D2' , 'C#2' , 'C2' , 'B1' , 'A#1' , 'A1' , 'G#1' , 'G1' , 'F#1' , 'F1' , 'E1' , 'D#1' , 'D1' , 'C#1' , 'C1' , 'B0' , 'A#0' , 'A0'];

    const steps = useRef([
        [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]
    ])

    localStorage.setItem('CURRENT_STEPS', JSON.stringify(steps.current));

    const onSubmit = (data) => {
        setState({data});
        console.log(data);
    }

    const componentWillMount = () => {
        setState({data: "monoSynth"});
    }

    const hello = (e) => {
        return e;
    }

    const handleClear = () => {
        props.setPlay(false);
        //console.log("clicked");
        const testblues = document.querySelectorAll('div.piano-roll-cell.blue');
        //console.log(testblues.length);
        for (let i = 0; i < testblues.length; i++) {
            testblues[i].classList.toggle('blue');
            //if (steps.current[col].indexOf(notes[row]) === -1) {
            //      steps.current[col] = steps.current[col].concat([notes[row]]);
            //  } 
            //console.log("found blue"); 
        }
        for (let i = 0; i < steps.current.length; i++) {
            steps.current[i] = [];
        }
        clearColLabel();
        localStorage.setItem('CURRENT_STEPS', JSON.stringify(steps.current));
    };

    const acceptMidi = async() => {
        handleClear();
        const data = await axios.get(`/nigel`, 
        {responseType: 'arraybuffer', transformResponse: [v => v]})
            .then(function (response) {
                //setSample(response.data);
                let file = response.data;
                let midi = new Midi(file);
                fillGridWithMidi(midi);
                
                console.log(file);
                let reader = new FileReader();
                reader.onload = () => {
                    //let midi = new Midi(reader.result);
                    console.log("filling grid...");

                    
                }
               // reader.readAsArrayBuffer(file);
            })

        };        

        const fillGridWithMidi = async(midi) => {
            const synths = [];
            const now = Tone.now() + 0.5;
            midi.tracks.forEach(track => {
                const synth = new Tone.PolySynth(10, Tone.Synth, {
                    envelope: {
                        attack: 0.02,
                        decay: 0.1,
                        sustain: 0.3,
                        release: 1
                    }
                }).toMaster();
                synths.push(synth);
                track.notes.forEach(note => {
                    synth.triggerAttackRelease(note.name, note.duration, note.time + now, note.velocity);
                });
            });
        };


/*        const randoms = document.querySelectorAll('div.piano-roll-cell');
        let col = 0;
        let row = 0;
        for (let i = 0; i < randoms.length; i++) {
            row = i % 88;
            var y = Math.random();
            col = (Math.round(y * 420) + 1) % steps.current.length;
            if (y < 0.1) {
                //if (steps.current[col].indexOf(notes[row]) === -1)
                //{
                //steps.current[col] = steps.current[col].concat([notes[row]]);
                //console.log(notes[row]);

                //}
                //console.log(`row: ${row}, col ${col},  i: ${i}, row * col ${row * col}, bool: ${randoms[(88*col)+row].classList.contains('blue')}`)
                if (randoms[(88 * col) + row].classList.contains('blue') === false) {
                    randoms[(88 * col) + row].classList.toggle('blue');
                    steps.current[col] = steps.current[col].concat([notes[row]]);

                }
                //console.log(steps.current);
                //console.log(steps.current[0]);
                //console.log(steps.current[col]);
                //steps.current[col] = steps.current[col].concat([notes[row]]);
            }
            // col++;
            // if (i % 8 === 0)
            // {
            //     col = col - 8;
            //     row++;
            //     console.log("here");
            // }

        }
        console.log(`randomize: ${steps.current[0]}`);
        localStorage.setItem('CURRENT_STEPS', JSON.stringify(steps.current));
    };
*/

    const decrementColumn = () =>{
        props.setPlay(false);
        var t = document.querySelector('.piano-roll-container--scrollable');
        var all_col = document.querySelectorAll('.piano-roll-col-container');
        console.log(`all_col: ${all_col.length}, cols: ${numOfCol.current}`)

        if (all_col.length === 8) {
            return;
        }

        t.removeChild(all_col[all_col.length - 1]);
        steps.current.pop();
        numOfCol.current = all_col.length - 1;
        console.log(`steps.current: ${steps.current}, cols: ${numOfCol.current}`);

        numOfCells.current -= 88;

    }

    // creates nodes(html elements/tag/object) and appends the node as a child of the container(inserts node into element container) 
    // to make a different colored cell for the sharp notes, regex pattern was made and used to match values a
    const addColumnElement = (index = 0) => {
        const piano_roll_container = document.querySelector('.piano-roll-container--scrollable');
        const pattern = /\w#\d/g;
        const T = document.querySelector('.tes');


        let col_container = document.createElement('div');
        col_container.classList.add('piano-roll-col-container');
        let col_label = document.createElement('div');
        col_label.classList.add('piano-roll-col-label');

        let span = document.createElement('span');
        span.innerText = index;
        col_label.appendChild(span);
        col_container.appendChild(col_label);
        for (let j = 0; j < notes.length; j++) {
            let col_cell = document.createElement('div');
            col_cell.classList.add('piano-roll-cell');
            if(numOfCells.current >= 703){
            let row;
            let col=0;
            for(row = numOfCells.current+1; row > notes.length-1;){
                row -= notes.length;
                col++;
            }
            numOfCells.current = numOfCells.current+1;
            col_cell.addEventListener('click',()=>{
                col_cell.classList.toggle('blue');
                props.setPlay(false);
                
                //console.log(`row: ${row}. col:${col}, notes.length: ${notes.length}, numOfCells: ${numOfCells.current}` );

                    //console.log(`row: ${row}. col:${col}, notes.length: ${notes.length}, numOfCells: ${numOfCells.current}` );


                    // console.log(`row: ${row}, col: ${col}, index%8 = ${index%8}`)
                    T.innerHTML = `col: ${col}, row: ${row}, index%8 = ${index % 8}`;


                    if (steps.current[col].indexOf(notes[row]) != -1) {
                        steps.current[col] = steps.current[col].filter((a) => {
                            return a != notes[row];
                        });
                        // console.log(steps.current);
                        // console.log('indexof 0');
                        return;
                    }
                    // if the note doesn't exist replace row with one that has been concatinated with the note/value
                    if (steps.current[col].indexOf(notes[row]) == -1) {
                        steps.current[col] = steps.current[col].concat([notes[row]]);
                        // console.log(steps.current);
                        // console.log('indexof -1')
                        return;
                    }
                })
            }
            if (notes[j].match(pattern)) col_cell.classList.add('sharp-color');
            col_container.appendChild(col_cell);

        }


        piano_roll_container.appendChild(col_container);

        // console.log(col_container);

    }

    const incrementColumn = () =>{
        props.setPlay(false);

        //var t = document.querySelector('.piano-roll-container--scrollable');

        //var all_col = document.querySelectorAll('.piano-roll-col-container');
        steps.current = steps.current.concat([[]]);
        //console.log(steps.current);
        numOfCol.current += 1;
        addColumnElement(numOfCol.current);

        console.log('added new column, so the current amount of columns are:', numOfCol.current)
    }

    const clearColLabel = () => {
        const purple_col = document.querySelector(".purple");
        try {
            purple_col.classList.remove('purple');
        }
        catch
        {
            return;
        }

    }



    useEffect(() => {
        const col_label = document.querySelectorAll('.piano-roll-col-label');
        col_label.forEach((e) => {
            if (e.classList.contains('purple')) console.log('purple');
        })

        if (props.play) {

            col_label[(previousStepIndex.current + 1) % (numOfCol.current - 1)].classList.remove('purple');
            // console.log( `prev plus 1 element = ${(previousStepIndex.current+1)%(numOfCol-1)}, previousIndex: ${previousStepIndex.current}, currentIndex: ${currentStepIndex}`);
            col_label[previousStepIndex.current].classList.remove('purple');
            col_label[currentStepIndex].classList.add('purple');
        }
    }, [currentStepIndex])

    useEffect(() => {
        const playhead = document.querySelector('.piano-roll-playhead')
        if (props.play) {
            console.log(playhead);
            const left_dist = window.getComputedStyle(playhead).left;
            console.log(window.getComputedStyle(playhead).left);
            console.log("before " + playhead.style.left);
            //playhead.style.left=(parseInt(playhead.style.left) + 1) + "%";
            playhead.style.left = parseInt(left_dist) + 49 + "px";
            console.log("after " + playhead.style.left);

            
        }
    }
    )

    const initializePianoRoll = () => {
        let i = 1;
        for (; i <= 24; i++) {
            addColumnElement(i);
            numOfCol.current += 1;
        }

        const row_label = document.querySelector('.piano-roll-row-container');
        const pattern = /\w#\d/g;
        notes.forEach((e) => {
            var di = document.createElement('div');
            var span = document.createElement('span');

            span.innerText = e;
            di.appendChild(span);
            di.classList.add('piano-roll-row-label');
            if (e.match(pattern)) di.classList.add('sharp-color');
            row_label.appendChild(di);

            if (e == "C4") di.scrollIntoView();
        })
    }
    useEffect(() => {
        const T = document.querySelector('.tes');

        initializePianoRoll();

        const test = document.querySelectorAll('.piano-roll-cell'); // aggregates all elements with that className
        // console.log(test);
        // for each element
        // 1 - toggle class on click
        // 2 - print the row and col of element
        // 3 - add to matrix (using useRef at the moment. I will try to change that later) if element value is not in matrix
        // 4 - remove element accordingly if value exists in same row of matrix
        test.forEach((e, index, array) => {
            numOfCells.current = index;
            e.addEventListener('click', () => {
                props.setPlay(false);
                clearColLabel();
                setCurrentStepIndex(-1)
                // console.log(index%8);
                let col = 0;
                let row;
                for (row = index; row > notes.length - 1;) {
                    row -= notes.length;
                    col++;
                }
                localStorage.setItem('CURRENT_STEPS', JSON.stringify(steps.current));
                // console.log(`row: ${row}, col: ${col}, index%8 = ${index%8}`)
                e.classList.toggle('blue');
                // T.innerHTML = `col: ${col}, row: ${row}, index%8 = ${index%8}`;
                // console.log(`row: ${row}, col: ${col}, index%8 = ${index%8}`)
                // setSteps(steps[col] = steps[col].concat([notes[row]]));
                // console.log(steps.current[col].indexOf(notes[row]));
                // if the note exists in appropriate row replace that row with an array without element
                // console.log("clicked", steps.current[col].indexOf(notes[row]));
                if (steps.current[col].indexOf(notes[row]) != -1) {
                    steps.current[col] = steps.current[col].filter((a) => {
                        return a != notes[row];
                    });
                    // console.log(steps.current);
                    // console.log('indexof 0');
                    return;
                }
                // if the note doesn't exist replace row with one that has been concatinated with the note/value
                if (steps.current[col].indexOf(notes[row]) == -1) {
                    steps.current[col] = steps.current[col].concat([notes[row]]);
                    // console.log(steps.current);
                    // console.log('indexof -1')
                    return;
                }

            })
            // console.log('done\n');


        })
    }, []);



    return (
        <>
            <div className="piano-roll-landing-container">
                <p className="tes"></p>
                <div className="clickables">
                    <div className = "instrumentChanger">
                        <form id = "instrumentForm" onSubmit = {handleSubmit(onSubmit)}>
                            <label>
                                Select Instrument
                                <div className = "instrumentsContent">
                                    <select {...register('instrument')}>
                                        <option value="monoSynth">monoSynth</option>
                                        <option value="amSynth">amSynth</option>
                                        <option value="duoSynth">duoSynth</option>
                                        <option value="fmSynth">fmSynth</option>
                                        <option value="membraneSynth">membraneSynth</option>
                                        <option value="metalSynth">metalSynth - NA </option>
                                        <option value="pluckSynth">pluckSynth</option>
                                        <option value="synth">synth</option>
                                    </select>
                                </div>
                            </label>
                        <button class= "applyButton" type="submit" value="Apply">Apply</button>
                        </form>
                    </div>

                    <button class="btn" onClick={handleClear}>Clear</button>
                    <button class="btn" onClick={acceptMidi}>Generate</button>
                    {/* <button onClick={decrementColumn}> 
                            remove column
                        </button>
                        <button onClick={incrementColumn}> 
                            add column
                        </button>
                     <button onClick={() => setIsPlaying(!isPlaying)}>
                            {!isPlaying ? 'Play' : 'Stop'}
                        </button> */}
                </div>
                {/* Reactronica Components */}
                <Song isPlaying={props.play} bpm={props.bpm} >
                    <Track
                        steps={steps.current}
                        // Callback triggers on every step
                        onStepPlay={(stepNotes, index) => {

                            setCurrentStepIndex(index);
                            //console.log(`prev.current:  ${previousStepIndex.current}, track index: ${index}, calc: ${(index + (numOfCol.current - 2)) % (numOfCol.current - 1)} numOfCol: ${numOfCol.current}`)
                            previousStepIndex.current = (index + (numOfCol.current - 1)) % (numOfCol.current);
                            console.log(`num of col: ${numOfCol.current}`)
                            //console.log(data.data.instrument);
                            //console.log({props.instrument});
                            console.log("index " + index);
                        }}
                        volume={props.vol}
                        pan={props.pan}
                    >
                        <Instrument type = {data.data.instrument}/>
                    </Track>
                </Song>
                
                <div className = "piano-roll-playhead"></div>
                <section className="piano-roll-container">
                    <section className="piano-roll-container--scrollable">
                        
                        <div className="piano-roll-row-container">
                            <div className="piano-roll-row-label" >
                                <span></span>
                            </div>


                        </div>
                    </section>
                </section>

            </div>
            <div>

            </div>
        </>
    );
}