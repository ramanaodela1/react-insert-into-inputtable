import React, { Component } from 'react';
import Header from "./Components/Header";
import Customer from "./Components/Customer";
 

class App extends Component {
  state = {
    
    rows: [{
        'firstname': 'Ramana',
        'lastname' : 'Odela',
          'age'   : '23'
      
      }, 
      {
        'firstname': 'Kiran',
        'lastname' : 'chandra',
          'age'   : '20'
      }, 
      {
        'firstname': 'Venkat',
        'lastname' : 'konda',
          'age'   : '28'
      
      }]
    };
    handleClick = () => {
      this.setState({ showResults: !this.state.showResults });
  
    }

  handleSubmit = (userObj) => {
    console.log(userObj)
    let userlist = this.state.rows;
    userlist.push(userObj) 
    console.log(userlist);
    this.setState({rows: userlist})
  }
  

  render() {
  
    return (
      <div className="App">
     <Header/>
     <Customer userList={this.state.rows}
                clickHandler={this.handleClick}
                submitHandler={this.handleSubmit}
                />
      </div>
    );
  }
}

export default App;
