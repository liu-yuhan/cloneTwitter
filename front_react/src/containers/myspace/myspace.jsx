import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import '../../components/stylesheet.css' 
//import banner from '../../components/images/funny_banner.png.jpeg'
import { Row, Col, ListGroup,Image,Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import {connect } from  'react-redux';
import {myspace} from '../../redux/actions'
    

class Myspace extends Component{
    constructor(props){
        super(props);
        this.state={
            photo : '',
            username : '',
            email : '',
            summary:''
        }
    }
render(){
    console.log(this.props) 
    const{ username, email, photo, summary } = this.props 
  
    
    return(
        <Container>
            <Row className="banner" >
                <Col sm="12" className="text-center" >
                    <h1 className="text-center my-auto"> Uspace </h1>  
                </Col>
            </Row>
            <Row>
                <Col sm ={8} className="border border-primary"   >
                    <Row className="my-3" >
                    <Col sm={8} >
                    <h3 className="text-center" > My twits </h3>
                    </Col>
                    <Col sm={{span:2, offset:2} } >
                    <Button size="sm" >New Twit </Button>
                    </Col>
                    </Row>
                </Col>
                <Col sm={4} className="border border-dark" >
                    <h3>Profil</h3>
                        <Image sm={4} src={ photo} alt="profil photo" fluide className="mx-auto" />
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
    )
}

}

export default connect(
    state => ({ user : state.user}),{myspace}
)(Myspace)