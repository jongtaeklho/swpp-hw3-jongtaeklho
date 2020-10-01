import React,{Component} from'react';
import * as actionCreators from '../actions/index';
import {connect} from'react-redux';
import Showcomment from './showcomment';
import {NavLink} from'react-router-dom';
class ArticleDetail extends Component{
    componentDidMount()
    {
        this.props.comment();
    }
    state={
       
        comment:'',

    }
    confirmbuttonhandler(article_id,author_id)
    {
        if(this.state.comment==='') return <button id='confirm-create-comment-button' disabled>confirm</button>
        else return <p><button onClick={(ev)=>
        {    ev.preventDefault();
            this.props.confrimcomment(article_id,author_id,this.state.comment);
            
        }
        } id='confirm-create-comment-button'>confrim</button></p>
    }
    articlebuttonhandler(cur_idx,author_id)
    {
        if(cur_idx===author_id)
            return [<p><button id='edit-article-button'>edit article</button></p>,
        <p><button id='delete-article-button'>delete article</button></p>]
           
    }

    render()
    {
        let author_id=-1;
        let author='';
        let title='';
        let content='';
        let author_list={};
        let cur_idx=-1;
        const article_idx=parseInt(this.props.match.params.id);
        this.props.articles.map((el)=>{
            if(el.id===article_idx)
            {
                author_id=el.author_id;
                title=el.title;
                content=el.content;
            }
        })
        this.props.user.map((el)=>{
            if(el.id===author_id)
             author=el.name;
            if(el.logged_in===true)
                cur_idx=el.id;
            author_list[String(el.id)]=el.name;
        })
        
        let list=[]
        this.props.comments.map((el)=>{
            if(el.article_id===article_idx)
            {
                list.push(el);
            }
        })

        const comment_list=list.map((el)=>{
            return <Showcomment name={author_list[String(el.author_id)]} comment={el.content}
            author_id={el.author_id} cur_id={cur_idx}></Showcomment>
        })
        
        return(
            <div>
                <h1 id='article-author'>{author}</h1>
                <h3 id='article-title'>{title}</h3>
                <h3 id='article-content'>{content}</h3>
                {comment_list}                
                <p><input type='text' id='new-comment-content-input' placeholder='comments...' 
                value={this.state.content} onChange={(ev)=>{
                    this.setState({comment:ev.target.value})
                }}></input></p>,
                {this.confirmbuttonhandler(article_idx,cur_idx)}
                {this.articlebuttonhandler(cur_idx,author_id)}
                <NavLink to='/articles'>
                    <p><button id='back-detail-article-button'>
                        back
                    </button></p>
                </NavLink>
            </div>
        );
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        comment:()=>{
            dispatch(actionCreators.getcomment());
        },
        confrimcomment:(article_id,author_id,content)=>{
            dispatch(actionCreators.createnewcomment(article_id,author_id,content))

        }
    }
}
const mapStateToProps=(state)=>{
    return{comments:state.at.comments,articles:state.at.articles,user:state.at.user}
}

export default connect(mapStateToProps,mapDispatchToProps)(ArticleDetail);