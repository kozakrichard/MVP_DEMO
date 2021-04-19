import React, {Component} from "react";
import Night from '../sources/night.mp4';
import './Home.css';                        //styling for video and background button in Home.css

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