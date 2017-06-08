import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import { Flex, Box } from 'reflexbox';
import FlexButton from './FlexButton.js';
import {TimerUtil } from './TimerUtil.js';

import Sound from 'react-sound';

var fileName = "start.mp3";
var tick = 1000;

function getTimeFrom(minutes){
    return 60*minutes;
}
   
function formattedTime(sec)  {
      
      var minutes= Math.floor(sec/60);
      var seconds = sec - (minutes*60);
      if(seconds < 10){
        return minutes+":0"+seconds;
      }
      return minutes+":"+seconds;
}
  
class App extends Component {
   
    constructor(props){
        super(props);
        this.state = ({
            currentCountStr: "00:00",
            currentCount: getTimeFrom(25),
            currentSong: fileName,
            playStatus: Sound.status.STOPPED
        })
    }
  
    componentDidMount() {
       this.intervalId = setInterval(this.timer.bind(this), tick);  
       document.title
    }
     
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
  
    timer() {
    
       this.setState({
          currentCountStr: formattedTime(this.state.currentCount - 1),
          currentCount: this.state.currentCount - 1,
           
       })
        
      if(this.state.currentCount < 1) { 
        clearInterval(this.intervalId);
        this.setState({
            currentCount: getTimeFrom(25),
            currentSong: fileName,
            playStatus: Sound.status.PLAYING
        })
      } 
    }
    
    makeTimeoutOf(minutes){
        this.setState({
            currentCount: getTimeFrom(minutes),
            currentSong: fileName,
            playStatus: Sound.status.PLAYING
        });
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.timer.bind(this), tick);
    }
    
    startPomodoro() {
        console.log("startPomodoro");
        this.makeTimeoutOf(25);
    }

    startShortBreak(){
        console.log("startShortBreak");
        this.makeTimeoutOf(5);
    }

    startLongBreak(){
        console.log("startLongBreak");
        this.makeTimeoutOf(10);
    }
    
    render() {
        return (<div className="App">
                    <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                        <h2 color="red">POMODORO APP</h2>
                    </div>
        
                    <Flex align='center' p={2}  justify='space-between' >
     
                        <FlexButton name="New pomodoro" onClick={() => this.startPomodoro() }/>
                        <FlexButton name="Short break" onClick={() => this.startShortBreak() }/>
                        <FlexButton name="Long break"  onClick={() => this.startLongBreak() }/>
                    
                    </Flex>

                    <div className="App-clock">{this.state.currentCountStr}</div> 
                    <Sound
                        url={this.state.currentSong}
                        playStatus={this.state.playStatus}
                        playFromPosition={this.state.position}
                        volume={100}
                        onLoading={({bytesLoaded, bytesTotal}) => console.log(`${bytesLoaded / bytesTotal * 100}% loaded`)}
                        onPlaying={({position}) => console.log(position)}
                        onFinishedPlaying={() => this.setState({playStatusd: Sound.status.STOPPED})} />
                </div> 
                );
    }
}

export default App;
