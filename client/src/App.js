import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Login from "./pages/Login";
import Login1 from "./pages/Login1";
import Checkout from './pages/ClientCheckout';
import './App.css';
import { withRouter } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

const initialState = {open1: false,
    open3: false,
    redirectToRefererrer: false,
    open: false,
    open4: false,
    auth: false
};

function refreshPage() {
  window.location.reload();
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    myCheckOutPage = () => {
        return (
            <Checkout handleSignOut={this.signOut.bind(this)} />
        )
    };

    signOut(){
        sessionStorage.removeItem('token');
        this.setState({auth: false});
        window.location.reload();
    };

    getKey (){
        const token = window.sessionStorage.getItem('token');
        console.log('before it hits the api verify route ', token);
        let error;
        if(token !== null) {
            axios.post('/api/verify', {token}).then((res, err) => {
                console.log('This is the response from the getkey route ', res.data);
                console.log('This is the type of for the res.data ', typeof res.data);
                console.log('this is the data for res.data.data ', res.data.data);
                error = err;
                // return res.data.data === true;
                if(res.data.data === true){
                    this.setState({auth: true})
                }else{
                    this.setState({auth:false})
                }
                if(this.props.location.pathname ==='/login1' && this.state.auth === true) {
                    this.props.history.push('/home_page');
                }
            });
        }else{
            this.setState({auth:false})
        }
    }

    componentWillMount(){
        this.getKey();
        console.log('This is the state in the component will mount ', this.state);
      }

    getValue = (event) => {
        // Updates the input state
        const {name, value} = event.target;
        this.setState(
            {
                [name]: value
            }
        );
    };

    clearState = () => {
        this.setState(initialState)
    };

    handleClose = () => {
        this.setState({ open: false, open1: false });
        this.clearState();
        refreshPage();
    };

    handlesubmit = (event) => {
        event.preventDefault();
        console.log("YOu just pressed the button");
        console.log('this is the state, ', this.state);
        console.log('this is the environment variable ', process.env);
        if((typeof (this.state.usrname) === 'undefined' || (this.state.usrname == null)) && (typeof this.state.password === 'undefined' || this.state.password == null)) {
            this.setState({open3: true});
        }else {
        axios.post('/login', this.state).then((res, err) => {
            console.log('this is the response for the login', res);
            console.log('this is the response for the login', res.data.data);
            if(typeof res.data.token !== 'undefined') {
                //save this on local storage
                sessionStorage.setItem('token', res.data.token);
                this.setState({auth: true});
                console.log('this is the state after the auth was udpated ', this.state);
                this.props.history.push('/home_page');
            }else{
                this.setState({open: true});
            }
            //put comments
        }).catch((e) => {
            console.log('Error: ', e);
        });}
    };

    handleAdd = (event) => {
        event.preventDefault();
        console.log('this is the state of the log-in page', this.state);
        axios.post('/register', this.state).then((res, err) => {
            console.log('just wanted to see the error ', err);
            if(err){
                console.log('There was an error ', err);
            }else{
                // res.status(200).json({message: 'this is the data' + res});
                if(res.data.data === 0) {
                    console.log('Data was not Added.  User already exist ', res);
                    this.setState({open1: true});
                }else {
                    console.log('Data was added ', res);
                    this.setState({open4: true});
                }
            }
        }).catch((e) => {
            console.log('Error: ', e);
        });
    };

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/login1"><Login1 getValue={this.getValue.bind(this)} usrname={this.state.usrname} open3={this.state.open3} open4={this.state.open4} handlesubmit={this.handlesubmit.bind(this)} handleAdd={this.handleAdd.bind(this)} open={this.state.open} open1={this.state.open1} handleClose={this.handleClose.bind(this)}/></Route>
                    <PrivateRoute exact path="/home_page" component={this.myCheckOutPage} auth={this.state.auth}/>
                    <Route exact path="/home_page1" component={Checkout} />
                </Switch>
            </div>
    );
  }
}

export default withRouter(App);
