/* import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
      constructor() {
          super();
          this.state = {};
      }

      getCurrentDisplay() {
          // we want to put something in state that indicates which display we want to show 
          // we'll have to update this property in state whenever we want to show the next display. where in our code should we update this property in state???
          if () {
              return (
                  <div>
                      <input name='email' placeholder="Email"></input>
                      <button onClick={(e) => this.checkEmail(e)}>Submit</button>
                  </div>
              )
          } else if () {
              return (
                  <div>
                      <input name='code' placeholder="Code"></input>
                      <input name='r_password' placeholder="New Password"></input>
                      <button onClick={(e) => this.checkEmail(e)}>Submit</button>
                  </div>
              )

          } else {
                 <div>
                      <h3> Your Password has successfully been reset ✌</h3>
                  </div>
          }
      }

      render() {
          return <div>
              { this.getCurrentDisplay() }
          </div>;
      }
  } */
