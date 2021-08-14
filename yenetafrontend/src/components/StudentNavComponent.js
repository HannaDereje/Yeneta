import React, { Component } from 'react'
import { Navbar, Nav } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

export default class StudentNavBar extends Component {

    constructor(props) {
        super(props)

    }

    render() {
        return (

            <div>
                <Navbar sticky="top" variant="dark" className="navStyle">
                    <Navbar.Brand href="/" className="brand">Yeneta/የኔታ</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="floatright">
                            <Nav.Link href="" className="mr-3" onClick={this.props.handleShow}>Create Chat</Nav.Link>
                            <Nav.Link href="" className="mr-3" href="/studentProfile"><img src="../images/img2.jpg" width="40" height="40" className="imgStyle" /></Nav.Link>
                        </Nav>

                    </Navbar.Collapse>
                </Navbar>

                <div>{this.props.children}</div>
            </div>
        )
    }
}