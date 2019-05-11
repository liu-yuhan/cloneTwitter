/*
Components for "/register"
*/
import React, {Component} from 'react';
//import { Link } from 'react-router-dom';
import { Row,Form, Col, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {connect} from  'react-redux';
import {update} from '../../redux/actions'


class Update extends Component{
    constructor(props){
        super(props);
        this.state={
            username : '',
            email : ' ',
            photo : ' ',
            password:' ',
            confirm_password:'',
            summary:' '
        }
    }

    handleUpdate = (event) => {
        this.props.update(this.state)
    }

    //箭头函数表达式
     handleChange = (event) =>{
            var newValue =event.target.value
            var toChangeKey = event.target.name
            this.setState({[toChangeKey]: newValue })
    //     //special presentation variable js [state]
    //     //take [name] as parameter, the real 'string' will  be the states.
     }

     handleRouteToLogin = ()=>{
         //console.log(this.props.history.location); 
        this.props.history.replace('/login')
     }

    render() {
        const {msg} = this.props.update
        return(
            <Container >
                <div className="mx-auto col-6 border border-dark my-3" >
                    <h1 className="text-center"> Update Profile </h1>
                    {msg ? <p className='error-msg'>{msg}</p> : null}
                    <Form className="my-3">
                        <Form.Group as={Row} controlId="formPlaintextName">
                                <Form.Label column sm="4">
                                   Photo
                                </Form.Label>
                                <Col sm="8">
                                    <Form.Control
                                    name = "photo"
                                    type='file'
                                    placeholder="Name"
                                    onChange={this.handleChange.bind(this)}
                                    />
                                </Col>
                            </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextName">
                            <Form.Label column sm="4">
                                Name
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                name = "username"
                                type="text"
                                placeholder="Name"
                                onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                                Email
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                name="email"
                                type="email"
                                placeholder="email@example.com"
                                onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                            Password
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={this.handleChange.bind(this)}
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                            Confirm Password
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                name="confirm_password"
                                type="password"
                                placeholder="confirm_password"
                                onChange={this.handleChange.bind(this)}
                               />
                            </Col>
                        </Form.Group>
                            <Button variant="primary" size="lg" block
                            onClick= {this.handleUpdate} >
                                Update
                            </Button>
                        <br/>
                        <Row className="mx-auto">
                            <Button 
                            variant="outline-secondary" 
                            onClick = {this.handleRouteToLogin.bind(this)}
                            block>
                                Login
                            </Button>
                        </Row>
                    </Form>
                </div>
            </Container>
        )}
}



export default connect(
    state => ({ user : state.user}),
    {update} //-> the asynchronous action for this component
 )(Update)