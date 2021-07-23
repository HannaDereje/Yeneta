import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar, Nav,NavDropdown} from "react-bootstrap"
import "../App.css"

export default class HomeNavBar extends Component{
  constructor(props){
    super(props)

}

    render(){
        return (

            <div>
          <Navbar collapseOnSelect  variant="dark" className="navStyle">
            <Navbar.Brand href="/" className="brand">Yeneta/ኔታ</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="floatright">
      <NavDropdown title="Register As" id="collasible-nav-dropdown" className="mr-5">
        <NavDropdown.Item href="/studentRegister">Student</NavDropdown.Item>
        <NavDropdown.Item href="/teacherRegister">Teacher</NavDropdown.Item>
      </NavDropdown>
      <NavDropdown title="Login As" id="collasible-nav-dropdown" className="mr-5">
        <NavDropdown.Item href="/studentLogin">Student</NavDropdown.Item>
        <NavDropdown.Item href="/teacherLogin">Teacher</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
                
               <div>{this.props.children}</div>
               
            </div>
        )
    }
}