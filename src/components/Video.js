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

      getVid = el => {
          this.video = el
      }

      playVideo = () => {
        // You can use the play method as normal on your video ref
        this.video.play();
      };

      pauseVideo = () => {
        // Pause as well
        this.video.pause();
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