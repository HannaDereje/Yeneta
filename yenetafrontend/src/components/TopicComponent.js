import React, {Component } from 'react'
import {Button, Modal, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default class Topic extends Component{

    constructor(props)
    {
        super(props)
    }

  render(){
  return (
    <div>

      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header>
          <Modal.Title>Topic Selection Section</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <Form className="">
                    <Form.Group controlId="exampleForm.ControlSelect1"  className="form_width">
                            <Form.Label>Select Discussion Topic</Form.Label>
                            <Form.Control as="select" className="">
                            <option>loerm lorem</option>
                            <option>loerm lorem</option>
                            <option>loerm lorem</option>
                            <option>loerm lorem</option>
                            <option>loerm lorem</option>
                            <option>loerm lorem</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group className="form_width btnstyle">
                            <Button type="submit" className="btnstyle">Select</Button>
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