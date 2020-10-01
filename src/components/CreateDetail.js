import React,{Component} from'react';

export default class CreateDetail extends Component{
    render()
    {
        return(
            <div className='createdetail'>
                <h3 id='article-author'>{this.props.author}</h3>
                <h3 id='article-title'>{this.props.title}</h3>
                <h3 id='article-content'>{this.props.content}</h3>
            </div>
        );
    }
}