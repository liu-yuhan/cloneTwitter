import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { Provider } from 'react-redux' ;
import { Navbar,} from 'react-bootstrap';
import store from './redux/store';
import Login from './containers/login/login';
import Register from './containers/register/register';
import Main from './containers/main/main'


ReactDOM.render(( 
        <Provider store = {store} >
            <Router>
                <Navbar bg="dark" variant="dark" fixed="bottom">                       
                    <NavLink  className="col-4 text-center" to="/" >Blogs</NavLink>                  
                    <NavLink  className="col-4 text-center" to="/MySpace" >My Space</NavLink>                               
                    <NavLink  className="col-4 text-center" to="/Chat" >Chat</NavLink>
                </Navbar>
                <Switch>
                <Route path = '/register' component={Register} ></Route>
                <Route path = '/login' component={Login} ></Route>
                <Route component={Main}></Route>
                </Switch>
            </Router>        
        </Provider>
        
      ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
