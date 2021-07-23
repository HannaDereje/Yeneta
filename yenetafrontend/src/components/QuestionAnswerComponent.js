import React, {Component } from 'react'
import {Button, Form} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

export default class Questions extends Component{

    render(){
        return (
            <div className="questionstyle">

                <h4 className="text-center">List of Question and Answer</h4>
                <div className="messageStyle">
                    <h6 className="usernameStyle">Username</h6>          
                    <div className="textStyle text-danger"><h6 className="usernameStyle">Question:</h6>   This is some text within a card body.loremVoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</div>    
                </div>
                <div className="answerStyle">  
                    <h6 className="usernameStyle text-success">Answer:</h6>
                    <p className="textStyle text-success">This is some text within a card body.loremVoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>    
                </div>
                <div className="messageStyle">
                    <h6 className="usernameStyle">Username</h6>          
                    <div className="textStyle text-danger"><h6 className="usernameStyle">Question:</h6>   This is some text within a card body.loremVoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</div>    
                </div>
                <div className="answerStyle">  
                    <h6 className="usernameStyle text-success">Answer:</h6>
                    <p className="textStyle text-success">This is some text within a card body.loremVoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</p>    
                </div>
                <div className="messageStyle">
                    <h6 className="usernameStyle">Username</h6>          
                    <div className="textStyle text-danger"><h6 className="usernameStyle">Question:</h6>   This is some text within a card body.loremVoluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident</div>    
                </div>
                    <Form>
                        <Form.Group className="form_width">
                            <Form.Label>Answer</Form.Label>
                            <p><textarea placeholder = "Answer" className="areawidth" cols="74" rows="4"></textarea></p>
                        </Form.Group>
                        <Form.Group className="form_width btnstyle">
                            <Button type="submit" className="btnstyle">Answer</Button>
                        </Form.Group>
                    </Form>
            </div>
        )
    }
}