import React from 'react';

import reducer from './articles';
import * as actionTypes from '../actionTypes';

const stubuser=[
    {id:0,email:'email1',password:'pw1',names:'name1',logged_in:true}
    
]
const stubarticles=[
    {id:0,author_id:'name1',title:'title1',content:'content1'}
]
const stubcomments=[
    {id:0,article_id:0,author_id:'name1',content:'content2'}
]



describe('reducer',()=>{
    it('should return default state', () => {
        const newState = reducer(undefined, {}); // initialize
        expect(newState).toEqual({ user:[],
            selected_article:null,
            articles:[],
            comments:[],
            });
      });
    
    it('should start users',()=>{
        const newState = reducer(undefined, {
            type: actionTypes.START,
            user: stubuser,
          });
          expect(newState).toEqual({
            user:stubuser,
            selected_article:null,
            articles:[],
            comments:[],
          });

    })

})
