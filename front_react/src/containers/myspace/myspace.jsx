import React, {Component, useImperativeHandle} from 'react'
import { Link } from 'react-router-dom'
import '../../components/stylesheet.css' 
import { Row, Col, ListGroup,Image,Button,Form } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import {connect } from  'react-redux'
import {myspace, newtwit} from '../../redux/actions'
import * as Cookies from "js-cookie";


class Myspace extends Component{
    
   constructor(props){
        super(props)
        this.state={
            //userId: Cookies.get('userid'),
            content:'',
            postTime:''
        }
        this.props.myspace(this.state)    
    
        
            
    }

    changeStateHandler=(event)=>{
        const val=event.target.value
        const stateToChange=event.target.name //because the name of input is same to state we made
        this.setState({[stateToChange]:val}) 
        this.setState({'postTime':Date()})    
        console.log("twit :  ", this.props.twit);
        console.log("state : ",this.state );    
    }

    sendTwitHandler=(event)=>{ 
        this.props.newtwit(this.state)
        console.log(this.state)
        this.props.myspace(this.state)    
        document.getElementById("formPlaintextTwit").value = "";
    }

render(){
    
    const {username,email,photo, summary, twits} = this.props.user
    console.log("check props.user.username", username ) 
    console.log("check props.user.twits " ,twits)
    var twitItems = null
    if(twits){
        twitItems = twits.map( (twit) =>
                            <div key={twit._id} className='text-center border border-primary my-2'  >
                                <p>username: {username} </p>
                                <p>content: {twit.content } </p>
                                <p>postTime: {twit.postTime} </p>
        </div>
        )
        console.log('twitItems:    ', twitItems )
    }
    return(   
        <Container>
            <Row className="banner" >
                <Col sm="12" className="text-center" >
                    <h1 className="text-center my-auto"> mypace </h1>  
                </Col>
            </Row>
            <Row>
                <Col sm ={8} className="border border-primary"   >
                    <Row className="my-3" >
                    <Col sm={12} >
                    <h3 className="text-center" > My twits </h3>
                    </Col>
                    </Row>
                    <Form className="myTwitCreator mx-auto" >
                        <Form.Group as={Row} controlId="formPlaintextTwit">
                            <Col sm={{span:10,offset:1}} >
                            <Form.Control 
                            name='content' 
                                as="textarea" 
                                rows="3" 
                                className="mx-auto"
                           onChange={this.changeStateHandler.bind(this) } 
                            />
                            </Col>
                        </Form.Group>
                        <Col sm={{span:10,offset:1}} >
                            <Button 
                                size="sm" 
                                block 
                                onClick={this.sendTwitHandler.bind(this)}> 
                                New Twit 
                            </Button>
                        </Col>
                    </Form>
                    <Col  >
                    {twitItems}
                    </Col>
                </Col>
                <Col sm={4} className="border border-dark" >
                    <h3>Profil</h3>
                        <Image sm={4} src={ photo} alt="profil photo" fluide='true' className="mx-auto" />
                        <ListGroup variant="flush">
                            <ListGroup.Item>Username : {username} </ListGroup.Item>
                            <ListGroup.Item>Email : {email} </ListGroup.Item>
                            <ListGroup.Item>Summary : {summary} </ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                        </ListGroup>
                        <Link to='/editprofil' >
                        <Button  variant="outline-danger" size="sm" className="my-1 mx-auto" block >Edit My Profil</Button>
                        </Link>
                </Col> 
            </Row>
            <Row className="footer" ></Row>
        </Container>
    )}

}

export default connect(
    state => ({
        twit:state.twit ,user:state.user}),{myspace, newtwit})(Myspace)