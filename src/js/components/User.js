import React, { Component } from "react";
import './user.css';

export default class User extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { avatar, name, title, company } = this.props.data;

    return (
      <li>
        <div className='avatar' style={{ backgroundImage: `url(${avatar})` }}></div>
        <div className='title'>
          <h3>{name}</h3>
          <span>{title} at {company}</span>
        </div>
        <div className='button'>
          <button onClick={() => this.props.onPress(this.props.arrayIndex)}>View</button>
        </div>
      </li>
    );
  }
}

