import React,{Component} from'react';
import {NavLink} from'react-router-dom';
import CreateDetail from './CreateDetail';
import {connect} from'react-redux';
import * as actionCreators from '../actions/articles';
class Create extends Component{
    state={
        title:'',
        content:'',
       
        mode:'write'
    }
    clickhandler=()=>{

        let author=''
        let author_id=''
        this.props.user.map((el)=>{
            if(el.logged_in===true)
            {
              author=el.name;
              author_id=el.id;
            }
        })
        
        if(this.state.mode==='write')
        {
            return [<p><input type='text' id='article-title-input' placeholder='title' 
            value={this.state.title} onChange={(ev)=>this.setState({title:ev.target.value})}></input></p>,
            <p><input type='text' id='article-content-input' placeholder='content'
            value={this.state.content} onChange={(ev)=>this.setState({content:ev.target.value})}></input></p>
        ]
    }
        else if(this.state.mode==='preview')
        {
            return<CreateDetail author={author}  title={this.state.title} content={this.state.content}></CreateDetail>
       }
    }
    buttonhandler()
    {
        if(this.state.title!==''&&this.state.content!=='')
            return     ( <p><button id='confirm-create-article-button' onClick={(ev)=>{
                ev.preventDefault();
                let id=-1;
                this.props.user.map((el)=>{
                    if(el.logged_in===true)
                        id=el.id;
                })
                this.props.createarticle(this.state.title,this.state.content,id);
                let lng=this.props.articles.length;
                let idx=this.props.articles[lng-1].id+1;
                this.props.history.push('/articles/'+idx);
            }} >create</button></p>);
        else
            return (<p><button id='confirm-create-article-button' disabled>create</button></p>)
    }


    render()
    {
        
        
        return(
            <div className='Create'>
                {this.clickhandler()}
                <NavLink to='/articles'>
               <p><button id='back-create-article-button'>back</button></p>
               </NavLink>
                {this.buttonhandler()}
                <p><button id='preview-tab-button' onClick={(ev)=>{
                    ev.preventDefault();
                    this.setState({mode:'preview'})
                    this.clickhandler();
                }}>preview</button></p>
                <p><button id='write-tab-button' onClick={(ev)=>
                {
                    ev.preventDefault();
                    this.setState({mode:'write'})
                    this.clickhandler();
                }}>write</button></p>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return({user:state.at.user,articles:state.at.articles})
}
const mapDispatchToState=(dispatch)=>{
    
    
    return{
        createarticle:(title,content,id)=>{
            dispatch(actionCreators.createnewarticle(title,content,id))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToState)(Create);