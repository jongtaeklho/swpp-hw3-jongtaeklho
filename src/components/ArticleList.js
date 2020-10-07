import React,{Component} from 'react';
import {connect} from'react-redux';
import Articles from './Articles';
import axios from'axios';
import * as actionCreators from '../actions/index';
import {NavLink, Redirect} from'react-router-dom';
class ArticleList extends Component{
    componentDidMount(){
       
        this.props.getarticles();
        this.props.onStart();
    }
   
    render()
    {
        let pos=false;
        this.props.user.map((el)=>{
            console.log(el);
            if(el.logged_in===true)
                pos=true;
        })
        if(pos===false)
            this.props.history.push('/login')

        let list;
        
        list=this.props.articles.map((el)=>{
            return(
                <Articles author_id={el.author_id} title={el.title} id={el.id}></Articles>
                ); 
                
            }
        )
        
        return(
            
            <div>
                {list}
                <NavLink to='/articles/create'>
                <p><button id='create-article-button'>Create</button></p>
                </NavLink>
                <p><button id='logout-button' onClick={()=>{
                    this.props.logout();
                    this.props.history.push('/login')
                }}>log out</button></p>



            </div>
        );
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        getarticles:()=>{
            dispatch(actionCreators.getarticlelist())
        },
        logout:()=>{
            dispatch(actionCreators.logout());
        },
        onStart:()=>{
            dispatch(actionCreators.getstart());
        },
    }
}
const mapStatetoProps=(state)=>{
    let articles=state.at.articles;
   return {articles:articles,user:state.at.user}
}


export default connect(mapStatetoProps,mapDispatchToProps)(ArticleList);