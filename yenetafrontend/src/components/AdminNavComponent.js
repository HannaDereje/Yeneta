import React, {Component} from 'react'
import {Navbar, Nav} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

export default class AdminNavBar extends Component{

    constructor(props){
        super(props)

    }

    render(){
        return (

            <div>
                <Navbar    variant="dark" className="navStyle">
            <Navbar.Brand href="/" className="brand">Yeneta/ኔታ Admin Page</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                  
                <Nav.Link href="" className="mr-3">Hello Admin</Nav.Link>
                </Nav>
                
            </Navbar.Collapse>
            </Navbar>
                
               <div>{this.props.children}</div>
            </div>
        )
    }
}