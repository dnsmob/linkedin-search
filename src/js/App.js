import React, { Component } from "react";
import ReactDOM from "react-dom";
import User from './components/User';
import Details from './components/Details'
import './app.css';

const server = 'https://cors-anywhere.herokuapp.com/http://hiring.rewardgateway.net'; // using _CORS anywhere_ as direct calls fail

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      people: [],
      isHidden: true,
      details: {}
    }
    this.errorCount = 0;
  }

  componentDidMount() {
    this._loadJson();
  }

  _loadJson() {
    let xhr = new XMLHttpRequest(); // because _fetch_ wasnt very happy
    xhr.open('GET', `${server}/list`);
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa('hard:hard'));

    xhr.onload = () => {
      console.log(JSON.parse(xhr.responseText)[0])
      if (this._checkStatus(xhr.status) && xhr.responseText.length > 0) {
        this.setState({ people: JSON.parse(xhr.responseText) });
        document.getElementsByTagName('body')[0].style.backgroundImage = 'url()';
        return;
      }

      // did receive a 200 but no data?
      this._loadJson();
    };

    xhr.onerror = () => {
      console.log('json load error');
      if (this.errorCount < 5) {
        this._loadJson();
        this.errorCount += 1;
        return;
      }

      console.log('cant load data at all :(');
    }
    xhr.send();
  }

  _checkStatus(code) {
    switch (code) {
      case 200:
        return true;

      case 500:
      default:
        return false;
    }
  }

  _onPress(key) {
    this.setState({ details: this.state.people[key] });
    this.setState({ isHidden: false });
  }

  _onClose() {
    this.setState({ isHidden: true });
  }

  render() {
    const len = this.state.people.length

    return (
      <div>
        <h4>{len > 1 ? `Showing ${len} results` : ''}</h4>
        <ul>
          {this.state.people.map((item, count) =>
            <User
              key={count}
              data={item}
              onPress={this._onPress.bind(this)}
              arrayIndex={count}
            />
          )}
        </ul>
        {!this.state.isHidden && <Details
          data={this.state.details}
          onPress={this._onClose.bind(this)} />}
      </div>
    );
  }
}


const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false;
