import React from 'react';
import { render } from 'react-dom';

const AppDescription = () => (
  <div>
    <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
    <p>This app will help you track your time and inform you when it's time to rest.</p>
  </div>
);

const time = 1200;

class App extends React.Component {

  state = {
    status: 'off',
    time: '0',
    time: 'null',
  };

  formatTime = time => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    return minutes + ':' + seconds;
  };

  step = () => {
    this.setState({
      ...this.state,
      time: this.state.time - 1,
    });

    if (this.state.time == 0) {
      this.playBell();
      if (this.state.status == 'work') {
        this.setState({
          ...this.state,
          status: 'rest',
          time: 20,
        })
      } else if (this.state.status == 'rest') {
        this.setState({
          status: 'work',
          time: time,
        })
      };
    }
  }


  startTimer = () => {

    this.setState({
      timer: setInterval(this.step, 1000),
      time: time,
      status: 'work',
    });

  };

  stopTimer = () => { 
    clearInterval(this.state.timer)
    this.setState({
      timer: null,
      time: 0,
      status: 'off',
    });
  }

  closeApp = () => {
    window.close();
  }

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  }

  render() {
    const { status } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <AppDescription />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(this.state.time)}</div>}
        {(status === 'off') && <button onClick={this.startTimer} className="btn">Start</button>}
        {(status !== 'off') && <button onClick={this.stopTimer} className="btn">Stop</button>}
        <button onClick={this.closeApp} className="btn btn-close">X</button>
      </div>
    )
  };
};

render(<App />, document.querySelector('#app'));