import React, { Component } from 'react'
import { Navbar, Nav } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

export default class StudentNavBar extends Component {

    constructor(props) {
        super(props)

    }
    logout(){

        localStorage.clear();
        window.location.href = "/studentLogin";

    }

    render() {
        return (

            <div>
                <Navbar variant="dark" className="navStyle">
                    <Navbar.Brand href="/" className="brand">Yeneta/የኔታ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="floatright">
                            <Nav.Link href="" className="mr-3" onClick={this.props.handleShow} >{this.props.name}</Nav.Link>
                            <Nav.Link href="" className="mr-3" href= "/studentProfile"><img src={this.props.image} width="40" height="40" className="imgStyle" /></Nav.Link>                           
                            <Nav.Link href="" className="mr-3" onClick={this.logout}>Logout</Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

                <div>{this.props.children}</div>
            </div>
        )
    }
}