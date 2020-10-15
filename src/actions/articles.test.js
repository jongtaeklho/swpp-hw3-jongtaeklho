import axios from 'axios';
// import * as router from 'connected-react-router';

import * as actionCreators from './articles';
import store from './store';

const stubuser=[
    {id:0,email:'email1',password:'pw1',names:'name1',logged_in:true}
    
]
const stubarticles=[
    {id:0,author_id:'name1',title:'title1',content:'content1'}
]
const stubcomments=[
    {id:0,article_id:0,author_id:'name1',content:'content2'}
]


describe('ActionCreators',()=>{
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('getstart should fetch user',(done)=>{
        const stubuserList=stubuser;
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: stubuserList
            };
            resolve(result);
          });
        })
  
      store.dispatch(actionCreators.getstart()).then(() => {
        const newState = store.getState();
        expect(newState.at.user).toBe(stubuserList);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
    it('getcomment should fetch comment',(done)=>{
        const stubcommentList=stubcomments;
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: stubcommentList
            };
            resolve(result);
          });
        })
  
      store.dispatch(actionCreators.getcomment()).then(() => {
        const newState = store.getState();
        expect(newState.at.comments).toBe(stubcommentList);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
    it('getstart should fetch user',(done)=>{
        const stubaritcleList=stubarticles;
        const spy = jest.spyOn(axios, 'get')
        .mockImplementation(url => {
          return new Promise((resolve, reject) => {
            const result = {
              status: 200,
              data: stubaritcleList
            };
            resolve(result);
          });
        })
  
      store.dispatch(actionCreators.getarticlelist()).then(() => {
        const newState = store.getState();
        expect(newState.at.articles).toBe(stubaritcleList);
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });

    it('createnewarticle create article properly', (done) => {
        const spy = jest.spyOn(axios, 'post')
          .mockImplementation((url, td) => {
            return new Promise((resolve, reject) => {
              const result = {
                status: 200,
                data: stubarticles
              };
              resolve(result);
            });
          })
    
        store.dispatch(actionCreators.createnewarticle('title1','content1','name1'))
        done();
      });
    

})