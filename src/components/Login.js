import React,{Component} from 'react';
import {connect} from 'react-redux';
import { LOGIN, START } from '../actions/actionTypes';
import axios from'axios';
import * as actionCreators from'../actions/index';
import * as actionTypes from'../actions/actionTypes';

class Login extends Component{
    componentDidMount(){
        this.props.user.map((el)=>{
        
            if(el.logged_in===true)
                this.props.history.push('/articles')
        })

        this.props.onStart();
       
    } 
    state={
        email:'',
        pw:'',
        
    }
   logginhandler=()=>{
    let pos=false;  
    this.props.user.map((el)=>{
          if(el.email===this.state.email&&el.password===this.state.pw)
          {
              pos=true;
          }
      })
      if(pos===true)
        this.props.history.push('/articles');
      else 
        alert('adfasdffads');
   }
   
    render()
    {
           
    
        return(
            <div>
                <h1>LOGIN PAGE</h1>
                <h2>email</h2>
                <p><input type='text' placeholder='email' id='email-input' value={this.state.email} 
                onChange={(ev)=>{
                    this.setState({email:ev.target.value})
                }}></input></p>
                <h2>pw</h2>
                <p><input type='text' placeholder='password' id='pw-input' value={this.state.pw} 
                onChange={(ev)=>{
                    this.setState({pw:ev.target.value})
                }}></input></p>
                <p><button id='login-button' onClick={(ev)=>{
                    ev.preventDefault();
                    this.props.onClick(this.state.email,this.state.pw)
                    this.logginhandler();
                }}>Log In</button></p>
            </div>
        );
    }
}

const mapDispathToProps=(dispatch)=>{
    return{
        onClick:(email,pw)=>{
           dispatch(actionCreators.getLogin(email,pw));
        },
        onStart:()=>{
            dispatch(actionCreators.getstart());
        },
        
    }
}
const mapStateToProps=(state)=>{
  return{user:state.at.user}
}

export default connect(mapStateToProps,mapDispathToProps)(Login);