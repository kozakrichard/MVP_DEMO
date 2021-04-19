import React, {Component} from "react";
import Night from '../sources/night.mp4';
import './Home.css';

    class Video extends React.Component {
      componentDidMount = () => {
        this.playVideo();
      };

      componentWillUnmount = () => {
          this.pauseVideo();
      };


      playVideo = () => {
        // You can use the play method as normal on your video ref
        this.refs.vidRef.play();
      };

      pauseVideo = () => {
        // Pause as well
        this.refs.vidRef.pause();
      };

      render = () => {
        return (
          <div className = "videoContainer">
            <video className = "Video"
                autoPlay
                loop
                muted
                ref="vidRef"
                src={Night}
                type="video/mp4"

            />

            <div>
              <button className = "videoButton" onClick={this.playVideo}>
                Play!
              </button>
              <button className = "videoButton" onClick={this.pauseVideo}>
                Pause!
              </button>
            </div>
          </div>
        );
      };
    }

 export default Video;