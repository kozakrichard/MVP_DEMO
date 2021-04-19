/*
Component works well, need to find a way to place the Pause/Play button to be
OVER the video.
Currently the button is blocked by the video when expanded to 100% of screen size.
*/

import React, {Component} from "react";
import Night from '../sources/night.mp4';
import './Home.css';

class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {playing: false};
    }

    componentDidMount = () => {
    this.playVideo();
    
    };

    componentWillUnmount = () => {
        this.pauseVideo();
    };

    getVid = el => {
        this.video = el
    }

    playVideo = () => {
        this.video.play();
        this.setState({playing: true});
    };

    pauseVideo = () => {
        this.video.pause();
        this.setState({playing: false});
    };

    render = () => {
        return (
            <div className = "videoContainer">
                <video className = "Video"
                    autoPlay
                    loop
                    muted
                    ref={this.getVid}
                    src={Night}
                    type="video/mp4"
                />

                <div className = "playbuttons">
                    <button className = "videoButton" onClick={this.state.playing ? this.pauseVideo : this.playVideo}>
                        {!this.state.playing ? 'Play Background' : 'Pause Background'}
                    </button>

                </div>
            </div>
        );
    };
}

export default Video;