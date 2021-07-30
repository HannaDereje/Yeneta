import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap"
import "../App.css"

export default class HomeNavBar extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (

      <div>
        <Navbar collapseOnSelect variant="dark" className="navStyle">
          <Navbar.Brand href="/" className="brand">Yeneta/የኔታ</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="floatright">
              <NavDropdown title="Register As" id="collasible-nav-dropdown" className="mr-5">
                <NavDropdown.Item href="/studentRegister">Student</NavDropdown.Item>
                <NavDropdown.Item href="/teacherRegister">Teacher</NavDropdown.Item>
              </NavDropdown>
              <Button variant="light" className="loginButton">Login</Button>
            </Nav>

          </Navbar.Collapse>
        </Navbar>

        <div>{this.props.children}</div>

      </div>
    )
  }
}