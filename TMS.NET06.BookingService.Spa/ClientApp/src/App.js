import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { BookingService } from './components/BookingService';

import './custom.css'
//import './main.css'

export default class App extends Component {
static displayName = App.name;

  render () {
      return (
            <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <Route path='/fetch-data' component={FetchData} />
            <Route path='/bookingClient' component={BookingService} />
            </Layout>
            
        //<Layout>
        //    <header id="navigation" class="navbar-inverse navbar-fixed-top animated-header">
        //        <div class="container">
        //            <nav class="collapse navbar-collapse navbar-right">
        //                <ul id="nav" class="nav navbar-nav">
        //                    <li><Route exact path='/' component={Home} /></li>
        //                    <li><Route path='/counter' component={Counter} /></li>
        //                    <li><Route path='/fetch-data' component={FetchData} /></li>
        //                    <li><Route path='/yclients' component={BookingService} /></li>
        //                </ul>
        //            </nav>
        //        </div>
        //    </header>
        //</Layout>
    );
  }
}
