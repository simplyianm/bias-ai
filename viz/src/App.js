import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Transcript from './Transcript';
import Video from './Video';
import InterviewRadar from './InterviewRadar';
import Sentiment from './Sentiment';

import model from './model';

const getEvent = (events, time) => {
  return events.length - 1 - events.slice().reverse().findIndex((e) => time >= e.time);
};

const findState = (states, time) => {
  return {};
};

const InterviewHeader = ({ interviewee }) => (
  <div className="InterviewHeader">
    <img src="./images/avatar.jpeg" alt="avatar" />
    <div>
      <h1>{ interviewee.name }</h1>
      <h2>{ interviewee.role }</h2>
    </div>
  </div>
)

class App extends Component {

  constructor() {
    super();
    this.state = {};
  }

  onSeek(time) {
    const ev = getEvent(model.events, time);
    this.setState({
      currentEvent: ev,
    });
  }

  onTranscriptSelect(index) {
    const el = document.getElementById('theVideo');
    if (el) {
      el.currentTime = model.events[index].time;
    }
  }

  render() {
    return (
      <div className="App">
        <Sidebar interviews={model.interviews} candidates={model.candidates} />
        <div className="App-container">
          <InterviewHeader interviewee={model.interviewee} />
          <div className="App-containerContents">
            <div className="App-main">
              <Video onSeek={this.onSeek.bind(this)} />

              <div className="App-details">
                <div className="App-radar">
                  <h3>Overall Attributes</h3>
                  <InterviewRadar overallStats={model.stats} />
                </div>
                <div className="App-info">

                  <h3>Info</h3>
                  <ul>
                    <li><strong>Name: </strong>{ model.interviewee.name }</li>
                    <li><strong>Email: </strong>{ model.interviewee.email }</li>
                    <li><strong>Phone: </strong>{ model.interviewee.phone }</li>
                    <li><strong>Interviewed By: </strong>{ model.interviewer.name }</li>
                  </ul>

                  <h3>Hiring Decision</h3>
                  <button>Approve</button>
                  <button>Reject</button>

                  <h3>Fulfill Reimbursement</h3>
                  <p>Account number: <input type="text" /></p>
                  <p>Routing number: <input type="text" /></p>
                  <button>Send via CapitalOne</button>

                </div>
              </div>

            </div>

            <div className="App-live">

              <h3>Live Sentiment</h3>
              <Sentiment event={model.events[this.state.currentEvent]} />

              <h3>Transcript</h3>
              <Transcript events={model.events} currentEvent={this.state.currentEvent} onTranscriptSelect={this.onTranscriptSelect.bind(this)} />

            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;
