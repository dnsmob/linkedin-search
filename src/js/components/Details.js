import React, { Component } from "react";
import './details.css';

export default class Details extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { avatar, name, title, company, bio } = this.props.data;

    return (
      <div className='details'>
        <div className='inner'>
          <div className='close' onClick={this.props.onPress}>X</div>
          <div className='avatar' style={{ backgroundImage: `url(${avatar})` }}></div>
          <h3>{name}</h3>
          <span>{title} at {company}</span>
          <div dangerouslySetInnerHTML={{__html: bio}}></div>
        </div>
      </div>
    );
  }
}

