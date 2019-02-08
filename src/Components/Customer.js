import React from "react";
import {isEmpty} from 'lodash';



class Customer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      age: '',
      formErrors: {
        firstname: '',
        lastname: '',
        age: '',
      }

    };
  }
  handleClick = () => {
    this.setState({ showResults: !this.state.showResults });
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });

    let formErrors = { ...this.state.formErrors };
    switch (name) {
      case "firstname":
        formErrors.firstname =
          value.length < 5 ? "minimum 5 characaters required" : "";
        break;
      case "lastname":
        formErrors.lastname =
          value.length < 4 ? "minimum 4 characaters required" : "";
        break;

      case "age":
        formErrors.age =
          value.length < 2 ? "minimum 2 digits required" : isNaN(value)? "only 2 digit numbers" :"";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };




  handleSubmit = (e) => {
    //console.log(11111111111);
    e.preventDefault();
    // let userObj = {
    //   firstname: e.target.firstname.value, 
    //   lastname: e.target.lastname.value,
    //   age: e.target.age.value,
    // }
    let userObj = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      age: this.state.age,
    }


    if(!isEmpty(this.state.firstname) && !isEmpty(this.state.lastname) && !isEmpty(this.state.age)){
      let {firstname,lastname,age}=this.state.formErrors;
      if(isEmpty(firstname) && isEmpty(lastname) && isEmpty(age)){
        this.props.submitHandler(userObj);
        this.setState({
          firstname: '',
          lastname: '',
          age: '',
        });
        this.setState({ showResults: !this.state.showResults });
      }

    }
    else{
      let {firstname,lastname,age}=this.state;
      let ferr,lerr,aerr;
      isEmpty(firstname)?ferr="minimum 5 characaters required":ferr="";
      
      isEmpty(lastname)?lerr="minimum 4 characaters required":lerr="";
      
      isEmpty(age)?aerr="minimum 2 characaters required":aerr="";

      this.setState({
        formErrors: {
          firstname: ferr,
          lastname: lerr,
          age: aerr,
        },
      });
      
    }
  }
  
  render() {
    const { formErrors } = this.state;

    return (
      <div>
        {!this.state.showResults ?
          <div>
            <table className="table col-6 mt-5 mb-5 mx-auto">
              <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {this.props.userList.map(function (user, i) {
                  return <tr key={i}>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.age}</td>
                  </tr>;
                })}
              </tbody>
            </table>
            <div className="text-right col-6 mx-auto">
              <button onClick={(e) => this.handleClick(e)} className="btn btn-success align-right ">Add</button>
            </div>
          </div>
          :
          <div className="col-6 mx-auto">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstname">Firstname:</label>
                <input type="firstname" className={formErrors.firstname.length > 0 ? "error form-control" : "form-control"} placeholder="Enter Firstname" name="firstname" onChange={this.handleChange} value={this.state.firstname} />

                {formErrors.firstname.length > 0 && (
                  <span className="text-danger">{formErrors.firstname}</span>
                )}

              </div>
              <div className="form-group">
                <label htmlFor="lastname">lastname:</label>
                <input type="lastname" className={formErrors.lastname.length > 0 ? "error form-control" : "form-control"} placeholder="Enter lastname" name="lastname" onChange={this.handleChange} value={this.state.lastname} />

                {formErrors.lastname.length > 0 && (
                  <span className="text-danger">{formErrors.lastname}</span>
                )}

              </div>
              <div className="form-group">
                <label htmlFor="age">age:</label>
                <input type="age" className={formErrors.age.length > 0 ? "error form-control" : "form-control"} placeholder="Enter age" name="age" onChange={this.handleChange} value={this.state.age} />

                {formErrors.age.length > 0 && (
                  <span className="text-danger">{formErrors.age}</span>
                )}

              </div>
              <button type="submit" className="btn btn-default btn-success">Submit</button>
            </form>
          </div>
        }

      </div>
    );
  }
}

export default Customer;