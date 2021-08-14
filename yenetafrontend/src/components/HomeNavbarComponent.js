import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap"
import "../App.css"
import "../css/register.css"

export default class HomeNavBar extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (

      <div>
        <Navbar sticky="top" collapseOnSelect expand="lg" variant="dark" className="navStyle">
          <Navbar.Brand href="/" className="brand">Yeneta/የኔታ</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="floatright">
              <NavDropdown title="Register As" id="responsive-nav-dropdown">
                <NavDropdown.Item href="/studentRegister">Student</NavDropdown.Item>
                <NavDropdown.Item href="/teacherRegister">Teacher</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/studentLogin" style={{ color: "white" }}>Login</Nav.Link>

            </Nav>

          </Navbar.Collapse>
        </Navbar>

        <div>{this.props.children}</div>

      </div>
    )
  }
}