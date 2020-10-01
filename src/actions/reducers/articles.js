import * as actionTypes from '../actionTypes';
import axios from'axios';
const initialstate={
    user:[],
    
    selected_articles:null,

    articles:[
        
    ],
    comments:[],
    
}

const reducer=(state=initialstate,action)=>{
    switch(action.type){
        case actionTypes.START:
            return {...state,user:action.user};
        case actionTypes.LOGIN:
           
           const moidfied=state.user.map((el)=>{
           
            if(el.email===action.email&&el.password===action.pw)
               {
                   const ne=el;
                   ne.logged_in=true;
                 
                   return ne;
               }
            else return el;
           })
           axios.put('/api/user/1',moidfied[0]);
           return {...state,user:moidfied}
        case actionTypes.GETARTICLE:
           return {...state,articles:action.articles,};
        case actionTypes.CREATE:
           
            const newarticle={author_id:action.author_id,title:action.title,content:action.content};
            axios.post('/api/articles',newarticle);
            
            return{...state,articles:[...state.articles,newarticle]}
        case actionTypes.GETCOMMENT:
            return{...state,comments:action.comments};
        case actionTypes.CREATECOMMENT:
            const newcomment={article_id:action.article_id,author_id:action.author_id,content:action.content};
            axios.post('/api/comments',newcomment)
            return{...state,comments:[...state.comments,newcomment]}
    }
    return state
}
export default reducer;