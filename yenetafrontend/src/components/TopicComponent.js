import React, { Component } from 'react'
import { Button, Modal, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default class Topic extends Component {

  constructor(props) {
    super(props)
    this.state = {

      input: {},
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.onTopicSelect = this.handleChange.bind(this)
  }

  onTopicSelect() {

  }



  handleChange(e) {

    let input = this.state.input;
    input[e.target.name] = e.target.value;

    this.setState({
      input: input
    })
    console.log(this.state.input)
  }

  render() {
    return (
      <div>

        <Modal show={this.props.show} onHide={this.props.handleClose} >
          <Modal.Header>
            <Modal.Title>Topic Selection Section</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="">
              <Form.Group controlId="exampleForm.ControlSelect1" className="form_width">
                <Form.Label>Select Discussion Topic</Form.Label>
                <Form.Control as="select" className="" name="topic" value={this.state.input.topic} onChange={this.handleChange}>
                  {this.props.topics.map((list) => {
                    return <option>{list.topic}</option>
                  })}
                </Form.Control>
              </Form.Group>

              <Form.Group className="form_width btnstyle">
                <Button type="submit" className="btnstyle" onClick={this.props.onTopicSelect}>Select</Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
          </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}