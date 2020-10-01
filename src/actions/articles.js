import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getstart_=(user)=>{
    return{type:actionTypes.START,user}
    
}

export const getstart=()=>{
    return dispatch=>{
        return axios.get('/api/user').then(
            res=> dispatch(getstart_(res.data))
        )
    }
}
export const getcomment_=(comments)=>{
    return {type:actionTypes.GETCOMMENT,comments}
}

export const getcomment =()=>{
    return dispatch=>{
        return axios.get('/api/comments').then(
            res=>dispatch(getcomment_(res.data))
        )
    }
}

export const getLogin_=(email,pw)=>{
    
    
    return{type:actionTypes.LOGIN,email,pw,};
}
export const getLogin=(email,pw)=>{
    
    return dispatch =>{
       return dispatch(getLogin_(email,pw))
           
       

    }
}

export const getarticlelist_=(articles)=>{
    return {type:actionTypes.GETARTICLE,articles};
}
export const getarticlelist=()=>{
    return dispatch=>{
        return axios.get('/api/articles').then(
            res=>dispatch(getarticlelist_(res.data))
        )
    }
}

export const createnewarticle_=(title,content,author_id)=>{
    return {type:actionTypes.CREATE,title,content,author_id};
}

export const createnewarticle=(title,content,author_id)=>{
    return dispatch=>{
        return dispatch(createnewarticle_(title,content,author_id));
    }
}
export const createnewcomment_=(article_id,author_id,content)=>{
    return {type:actionTypes.CREATECOMMENT,article_id,author_id,content};
}
export const createnewcomment=(article_id,author_id,content)=>{
    return dispatch=>{
        return dispatch(createnewcomment_(article_id,author_id,content))
    }
}