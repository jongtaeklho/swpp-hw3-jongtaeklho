import * as actionTypes from '../actionTypes';
import axios from'axios';
const initialstate={
    user:[],
    
    selected_article:null,

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
           
            let article_lng=state.articles.length;
            let idx=state.articles[article_lng-1].id+1;

            const newarticle={author_id:action.author_id,title:action.title,content:action.content,id:idx};
            axios.post('/api/articles',newarticle);
            
            return{...state,articles:[...state.articles,newarticle]}
        case actionTypes.GETCOMMENT:
            return{...state,comments:action.comments};
        case actionTypes.CREATECOMMENT:
            const newcomment={article_id:action.article_id,author_id:action.author_id,content:action.content};
            axios.post('/api/comments',newcomment)
            return{...state,comments:[...state.comments,newcomment]}
        case actionTypes.EDITCOMMENT:
            const modified_comments=state.comments.map((el)=>{
                if(el.id===action.id)
                {
                    
                    let newcomment={...el};
                    newcomment.content=action.content;
                   
                    axios.post('api/comments'+el.id,newcomment);
                    return newcomment;
                }
                else return el;
            })
            return{...state,comments:modified_comments}
        case actionTypes.DELETECOMMENT:
            const deleted_comments=state.comments.filter((el)=>{
                if(el.id!==action.id)
                    return el;
                
            })
            axios.delete('api/comments/'+action.id);
            return {...state,comments:deleted_comments};
        case actionTypes.DELETEARTICLE:
            const deleted_articles=state.articles.filter((el)=>{
                if(el.id!==action.id)
                return el;
            })
            axios.delete('api/articles/'+action.id);
            return{...state,articles:deleted_articles};
        case actionTypes.GETDETAILARTICLE:
            return{...state,selected_article:action.selected_article}
        case actionTypes.EDITARTICLE:
           let modified_articles=state.articles.map((el)=>{
               if(el.id===action.article_id)
                {
                    let tmparticle={...el};
                    tmparticle.title=action.title;
                    tmparticle.content=action.content;
                   
                    axios.put('api/articles/'+el.id,tmparticle);
                    return tmparticle;
                }
                else
                return el;
           })
           return{...state,articles:modified_articles}
        case actionTypes.LOGOUT:
            let modified_user=state.user.map((el)=>{
                if(el.email==='swpp@snu.ac.kr')
                {
                    let tmpuser={...el};
                    tmpuser.logged_in=false;
                    axios.put('/api/user/1',tmpuser)
                    return tmpuser;
                }
                else return el;
            })
            return{...state,user:modified_user}
    }
    return state
}
export default reducer;