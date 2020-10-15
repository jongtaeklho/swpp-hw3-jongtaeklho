import React,{Component} from'react';


export default class Showcomment extends Component{
    buttonhandler()
    {
        if(this.props.cur_id===this.props.author_id)
        return [<button id='edit-comment-button' onClick={
            (ev)=>{
                 
                this.props.clicked();
                  }
        }>edit</button>,
     <button id='delete-comment-button' onClick={(ev)=>{
       
         this.props.deleteclicked();
     }}>delete</button>]
    }
    
    render()
    {
        return(
        <div className='showcomment'>
        <h3>{this.props.name}&nbsp;&nbsp;&nbsp;{this.props.comment}</h3>
        &nbsp;&nbsp;
        {this.buttonhandler()}
        </div>
        );
    }
}