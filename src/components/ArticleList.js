import React,{Component} from 'react';
import {connect} from'react-redux';
import Articles from './Articles';
import axios from'axios';
import * as actionCreators from '../actions/index';
import {NavLink} from'react-router-dom';
class ArticleList extends Component{
    componentDidMount(){
       
        this.props.getarticles();

    }
    render()
    {
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
            </div>
        );
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        getarticles:()=>{
            dispatch(actionCreators.getarticlelist())
        }
    }
}
const mapStatetoProps=(state)=>{
    let articles=state.at.articles;
   return {articles:articles}
}


export default connect(mapStatetoProps,mapDispatchToProps)(ArticleList);