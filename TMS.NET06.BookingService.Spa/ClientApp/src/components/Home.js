import React, { Component } from 'react';
import './Home.css';


export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Добро пожаловать!</h1>
        <p>Мы в инстаграме:</p>
        <ul>
                <li><a href='https://www.instagram.com/katcher_lash/'>Katcher Lash</a> </li>
            </ul>
                </div>
    );
  }
}
