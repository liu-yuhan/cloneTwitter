/*
Components for "/login"
*/
import React, {Component} from 'react'
import { Row,Form, Col, Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

class Login extends Component{
    
    constructor(props){
        super(props)
        this.state= {
            email : '',
            password :''
        }
    }

    handleChange = (event)=> {
        var value = event.target.value
        var toChangeState = event.target.name
        this.setState({[toChangeState] :value })
    }

    handleLogin = (event)=>{
        event.preventDefault()
        console.log(this.state)    
    }

    toRegister = ()=>{
        this.props.history.replace('/register')
    }

    render(){
        return(
            <Container >
                <div className="mx-auto col-4 border border-dark my-3" >
                    <h1 className="text-center"> Login </h1>
                    <Form className="my-3">
                        <Form.Group as={Row} controlId="formPlaintextEmail">
                            <Form.Label column sm="4">
                                Email
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control 
                            type="email"  
                            name="email"
                            placeholder="email@example.com" 
                            onChange = {this.handleChange.bind(this)}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formPlaintextPassword">
                            <Form.Label column sm="4">
                            Password
                            </Form.Label>
                            <Col sm="8">
                            <Form.Control 
                            type="password" 
                            name="password"
                            placeholder="Password" 
                            onChange = {this.handleChange.bind(this)}/>
                            </Col>
                        </Form.Group>
                        <Button 
                        variant="primary" 
                        type="submit" 
                        onClick={this.handleLogin}
                        className="mx-auto"
                        block>
                            Login
                        </Button>
                        <Button 
                        variant="primary" 
                        onClick={this.toRegister}
                        type="submit" 
                        size="lg" 
                        block>
                            Don't have account yet...
                        </Button>
                    </Form>              
                </div>
            </Container>
        )}
}

export default Login