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

export const editcomment_=(id,content)=>{
    return {type:actionTypes.EDITCOMMENT,id,content};
}
export const editcomment=(id,content)=>{
    return dispatch=>{
        return dispatch(editcomment_(id,content));
    }
}

export const deletecomment_=(id)=>{
    return {type:actionTypes.DELETECOMMENT,id};
}
export const deletecomment=(id)=>{
    return dispatch=>{
        return dispatch(deletecomment_(id));
    }
}

export const deletearticle_=(id)=>{
    return {type:actionTypes.DELETEARTICLE,id};
}
export const deletearticle=(id)=>{
    return dispatch=>{
        return dispatch(deletearticle_(id))
    }
}


export const getdetailarticle_=(selected_article)=>{
    return{type:actionTypes.GETDETAILARTICLE,selected_article}
}
export const getdetailarticle=(id)=>{
    return dispatch=>{
        return axios.get('/articles/'+id).then(res=>{
            dispatch(getdetailarticle_(res.data))
        })
    }
}

export const editarticle_=(title,content,article_id)=>{
    return {type:actionTypes.EDITARTICLE,title,content,article_id};
}
export const editarticle=(title,content,article_id)=>{
    return dispatch=>{
        return dispatch(editarticle_(title,content,article_id))
    }
}
export const logout_=()=>{
    return{type:actionTypes.LOGOUT}
}
export const logout=()=>{
    return dispatch=>{
        return dispatch(logout_());
    }
}