import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
export default class Articles extends Component{
    render()
    {
        return(
            <div className='Article'>
                {this.props.id}
                &nbsp;&nbsp;
                <NavLink to={'/articles/'+this.props.id}>
                <button>{this.props.title}</button> 
                </NavLink>&nbsp;&nbsp;
                {this.props.author_id}   

            </div>
        );
    }
}