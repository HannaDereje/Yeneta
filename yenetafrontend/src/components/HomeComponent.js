import React, {Component} from 'react'
import {BrowserRouter as  Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Jumbotron, Button, Card } from "react-bootstrap"
import HomeNavBar from './HomeNavbarComponent'
import '../css/register.css'
export default class Home extends Component{


    render(){
        return (
                <div>
                <HomeNavBar>
                <Container fluid className="conbg">
                <div className="contextstyle">
                <h3>Hello, world!</h3>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
                </div>
                </Container>
                <h4 className= "text-center">Our Levels<hr className="hrstyle"/></h4>
                <Container >
                    <div className="Jumbocon" >
                   
                <Jumbotron className="mr-2">
                <h1>Beginner</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
                </Jumbotron>
                <Jumbotron className="mr-2">
                <h1>Intermediate</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
                </Jumbotron>
                <Jumbotron className="mr-2">
                <h1>Advanced</h1>
                <p>
                    This is a simple hero unit, a simple jumbotron-style component for calling
                    extra attention to featured content or information.
                </p>
                <p>
                    <Button variant="primary">Learn more</Button>
                </p>
                </Jumbotron>
                </div>
                <h4 className= "text-center">Some Contents<hr className="hrstyle"/></h4>
                
                <div className="Jumbocon">
                
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="../images/img1.jpg" />
                <Card.Body>
                    <Card.Title>Lesson 1</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">View More</Button>
                </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="../images/img5.jpg" />
                <Card.Body>
                    <Card.Title>Lesson 1</Card.Title>
                    <Card.Text>
                    <audio controls className="audioWidth"></audio>
                    </Card.Text>
                    <Button variant="primary">View More</Button>
                </Card.Body>
                </Card>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Lesson 1</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button variant="primary">View More</Button>
                </Card.Body>
                </Card>
                </div>
                </Container>
                </HomeNavBar>
                </div>
        )
    }
}