import React, { Component } from 'react';
import './App.css';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import Login from './components/Login';
import ArticleList from './components/ArticleList';
import Create from'./components/Create';
import {connect} from'react-redux';
import CreateDetail from './components/CreateDetail';
import ArticleDetail from './components/ArticleDetail';
import ArticleEdit from './components/ArticleEdit';


class App extends Component {
  render(){
    let re=null;
    this.props.user.map((el)=>{
      if(el.logged_in===true)
        re= <Redirect exact from='/login' exact to='/articles'></Redirect>
    })
    
   
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
      <Route  exact path='/login' exact component={Login}></Route>
      <Route  path='/articles' exact component={ArticleList}></Route>
      <Route  path='/articles/create' component={Create}></Route>
      <Route exact path='/articles/:id' exact component={ArticleDetail}></Route>
      <Route exact path='/articles/:id/edit' exact component={ArticleEdit}></Route>
     </Switch>
     <Redirect exact from='/' exact to='/login'></Redirect>
    {re}
    </div>
    </BrowserRouter>
  );
}
}




export default connect(function(state){
  return{user:state.at.user}
},null)(App);
