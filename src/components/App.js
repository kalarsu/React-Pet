import React, { Component } from 'react';
import '../css/App.css';

import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointment';
import SearchAppointments from './SearchAppointments';

class App extends Component{
  
  constructor() {
    super(); //allow you to get info from parent component, also from other component to this component. Also allows you to use 'this'
    this.state = {
      myAppointments: [],
      lastIndex: 0
    }
  }

  //React lifecycle method
  componentDidMount(){
    fetch('./data.json') //once the application is disassemble, the json will be same folder as current document
      .then(response => response.json()) //fetch works with Javascript 'promise' which common need is to execute two or more asynchronous operations back to back. 'response.json()' to make sure response come in as json object
      .then(result => {
        const  apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({lastIndex: this.state.lastIndex + 1});
          return item; //using map to loop through json data and assign all datas to this apts const
        })
        this.setState({
          myAppointments: apts
        });
      });

      
  }

  render(){
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments />
                <SearchAppointments/>
                <ListAppointments appointments={this.state.myAppointments} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
