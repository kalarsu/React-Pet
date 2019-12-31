import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointment';
import SearchAppointments from './SearchAppointments';
import {without} from 'lodash';

class App extends Component{
  
  constructor() {
    super(); //allow you to get info from parent component, also from other component to this component. Also allows you to use 'this'
    this.state = {
      myAppointments: [],
      formDisplay: false,
      orderBy: 'petName',
      orderDir: 'asc',
      lastIndex: 0
    }
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
  }

  toggleForm(){
    this.setState({
      formDisplay: !this.state.formDisplay
    })
  }

  addAppointment(apt){
    let tempApts = this.state.myAppointments;
    apt.aptId = this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments: tempApts,
      lastIndex: this.state.lastIndex + 1
    });
  }

  deleteAppointment(apt){
    let tempApts = this.state.myAppointments;
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments: tempApts
    })
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

    let order;
    let filteredApts = this.state.myAppointments;
    if(this.state.orderDir ==='asc'){
      order = 1;
    }else{
      order = -1;
    }

    filteredApts.sort((a,b) =>{
      if(a[this.state.orderBy].toLowerCase() < b[this.state.orderBy].toLowerCase()){
        return -1 * order;
      }else{
        return 1 * order;
      }
    })

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay = {this.state.formDisplay} 
                  toggleForm = {this.toggleForm}
                  addAppointment = {this.addAppointment}
                />
                <SearchAppointments 
                  orderBy = {this.state.order}
                  orderDir = {this.state.orderDir}
                />
                <ListAppointments appointments={filteredApts} 
                  deleteAppointment={this.deleteAppointment} />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
