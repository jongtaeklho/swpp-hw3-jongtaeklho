import React,{Component} from'react';
import { connect } from 'react-redux';
import { Redirect,NavLink } from 'react-router-dom';
import CreateDetail from './CreateDetail';
import * as actionCreators from '../actions/index';

class ArticleEdit extends Component{
   componentDidMount()
   {
        this.props.getdetailarticle(Number(this.props.match.params.id))
   }
    state={
       title:'',
       content:'',
       author_id:'',
        mode:'start',
       
    }
    clickhandler()
    {
       
        if(this.state.mode==='write')
        {
           
            return [<p><input type='text' id='article-title-input' placeholder='title' 
            value={this.state.title} onChange={(ev)=>this.setState({title:ev.target.value})}></input></p>,
            <p><input type='text' id='article-content-input' placeholder='content'
            value={this.state.content} onChange={(ev)=>this.setState({content:ev.target.value})}></input></p>]

        }
        if(this.state.mode==='preview')
        {
            let name='';
            this.props.user.map((el)=>{
                if(el.id===this.props.article.author_id)
                    name=el.name;
            })
            return<CreateDetail author={name}  title={this.state.title} content={this.state.content}></CreateDetail>
        }
    }
    buttonhandler()
    {
        if(this.state.title!==''&&this.state.content!=='')
            return     ( <p><button id='confirm-edit-article-button' onClick={(ev)=>{
              
                this.props.editarticle(this.state.title,this.state.content,Number(this.props.match.params.id));
                this.setState({mode:'edit'});
            }} >edit</button></p>);
        else
            return (<p><button id='confirm-edit-article-button' disabled>edit</button></p>)
    }
    backbutton()
    {
        let title,content,author_id;
            this.props.article.map((el)=>{
                if(el.id===Number(this.props.match.params.id))
                {
                    title=el.title;
                    content=el.content;
                    author_id=el.author_id;
                }
        })
        if(title===this.state.title&&content===this.state.content)
        {
            this.props.history.push('/articles/'+Number(this.props.match.params.id))
        }
        else{
            let result = window.confirm("Are you sure? The change will be lost.");
            if(result===true)
            {
                this.props.history.push('/articles/'+Number(this.props.match.params.id))
            }
           
        }
    }
    render()
    {
        if(this.state.mode==='edit')
        {
            
            return <Redirect to={'/articles/'+this.props.match.params.id}></Redirect>
        }
        if(this.props.article)
        {
            let title,content,author_id;
            this.props.article.map((el)=>{
                if(el.id===Number(this.props.match.params.id))
                {
                    title=el.title;
                    content=el.content;
                    author_id=el.author_id;
                }
            })
            if(this.state.mode==='start')
            {if(this.state.title==='')
                this.setState({title:title})
            if(this.state.content==='')
                this.setState({content:content})
            if(this.state.author_id==='')
                this.setState({author_id:author_id})
            this.setState({mode:'write'})
        }
    }
 
        return(
            <div className='articleedit'>
                {this.clickhandler()}
               <p><button id='back-edit-article-button' onClick={()=>{
                   this.backbutton();
               }}>back</button></p>
             
                {this.buttonhandler()}
                <p><button id='preview-tab-button' onClick={(ev)=>{
                  
                    this.setState({mode:'preview'})
                    this.clickhandler();
                }}>preview</button></p>
                <p><button id='write-tab-button' onClick={(ev)=>
                {
                 
                    this.setState({mode:'write'})
                    this.clickhandler();
                }}>write</button></p>
                <p><button id='logout-button' onClick={()=>{
                    this.props.logout();
                    this.props.history.push('/login')
                }}>log out</button></p>


            </div>    

        );
    }
}

const mapDispathToProps=(dispatch)=>{
    return{
        editarticle:(title,content,article_id)=>{
            dispatch(actionCreators.editarticle(title,content,article_id));
        },
        getdetailarticle:(id)=>{
            dispatch(actionCreators.getdetailarticle(id))
    },
    logout:()=>{
        dispatch(actionCreators.logout());
    }

        }
    }

const mapStateToProps=(state)=>{
    

    return{article:state.at.articles,user:state.at.user}
}
export default connect(mapStateToProps,mapDispathToProps)(ArticleEdit);