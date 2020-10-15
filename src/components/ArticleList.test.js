import React from 'react';
import Create from './Create';
import {mount,configure} from 'enzyme';
import {getMockStore} from '../test-units/mocks';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import{Provider} from 'react-redux';
import * as actionCreators from '../actions/articles';
import ArticleList from './ArticleList';
import Login from './Login'
configure({ adapter: new Adapter() });
const initialstate={
    user:[{email:'id1',password:'pw1',logged_in:true},{email:'id2',password:'pw2',logged_in:false}],
    selected_article:null,
    articles:[{title:'a',content:'b',id:'0',author_id:'c'}],
    comments:[], 
  }

const mockStore=getMockStore(initialstate);
jest.mock('./Login', () => {
    return jest.fn(props => {
      return (
        <div className="spylogin">
         
        </div>);
    });
  });




describe('ArticleList',()=>{
    let articlelist,spygetstart,spygetarticlelist;
    beforeEach(()=>{
        articlelist=(
            <Provider store={mockStore}>
                <BrowserRouter>
                <Route path='/' exact component={ArticleList}></Route>
                <Route path='/login' component={Login}></Route>
                </BrowserRouter>
            </Provider>
        );
        spygetstart=jest.spyOn(actionCreators,'getstart')
        .mockImplementation(()=>{return dispatch=>{}});
        spygetarticlelist=jest.spyOn(actionCreators,'getarticlelist')
        .mockImplementation(()=>{return dispatch=>{}});
        
    });
    afterEach(() => { jest.clearAllMocks() });
    
    it('should render properly',()=>{
        const component=mount(articlelist);
        expect(component.find('.articlelist').length).toBe(1);
        expect(spygetstart).toBeCalledTimes(1);
        expect(spygetarticlelist).toBeCalledTimes(1);
    })

    it('shoud logout properly',()=>{
        const spylogout=jest.spyOn(actionCreators,'logout')
        .mockImplementation(()=>{return dispatch=>{}});
        const component=mount(articlelist);
        const wrapper=component.find('#logout-button');
        wrapper.simulate('click');
        expect(spylogout).toBeCalledTimes(1);
    });
    it('should logout ',()=>{
        const component=mount(articlelist);
        expect(component.find('.spylogin').length).toBe(1);
    })
})


