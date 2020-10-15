import React from 'react';
import Create from './Create';
import {mount,configure} from 'enzyme';
import {getMockStore} from '../test-units/mocks';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import{Provider} from 'react-redux';
import * as actionCreators from '../actions/articles';
configure({ adapter: new Adapter() });
const initialstate={
    user:[{email:'id1',password:'pw1',logged_in:true},{email:'id2',password:'pw2',logged_in:false}],
    selected_article:null,
    articles:[{title:'a',content:'b',id:'0'}],
    comments:[], 
  }
 
jest.mock('./CreateDetail', () => {
    return jest.fn(props => {
      return (
        <div className="spyDetail">
         
        </div>);
    });
  });


  const mockStore=getMockStore(initialstate);

  describe('Create',()=>{
      let create;
      beforeEach(()=>{
          create=(
            <Provider store={mockStore}>
            <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Create}/>
                <Redirect from='/articles/:id' to='/'/>
            </Switch>
            </BrowserRouter>
        </Provider>
          );
      })
      afterEach(() => { jest.clearAllMocks() });
    

      it('should render properly',()=>{
          const component=mount(create);
          expect(component.find('.Create').length).toBe(1);
          
      })
       
      it('should change preview mode',()=>{
        const component=mount(create);
        const wrapper=component.find('#preview-tab-button');
        wrapper.simulate('click');
        
        const createInstance=component.find(Create.WrappedComponent).instance();
        expect(createInstance.state.mode).toEqual('preview');
        expect(component.find('.spyDetail').length).toBe(1);
      })
      it('should change write mode',()=>{
        const component=mount(create);
        const wrapper=component.find('#write-tab-button');
        wrapper.simulate('click');
        const createInstance=component.find(Create.WrappedComponent).instance();
        expect(createInstance.state.mode).toEqual('write');
      })
      it('should change properly title',()=>{
        const title="Title-test";  
        const component=mount(create);
        const wrapper=component.find('#article-title-input');
        wrapper.simulate('change',{target:{value:title}});
        const createInstance=component.find(Create.WrappedComponent).instance();
        expect(createInstance.state.title).toEqual(title);
      })
      it('should change properly title',()=>{
        const content="Content-test";  
        const component=mount(create);
        const wrapper=component.find('#article-content-input');
        wrapper.simulate('change',{target:{value:content}});
        const createInstance=component.find(Create.WrappedComponent).instance();
        expect(createInstance.state.content).toEqual(content);
      })
      it('should create properly',()=>{
        const spycreatenewarticle=jest.spyOn(actionCreators,'createnewarticle')
        .mockImplementation(()=>{return dispatch=>{}});
        const content="Content-test";  
        const title="Title-test";  
       
        const component=mount(create);
        const change_article=component.find('#article-content-input');
        const change_title=component.find('#article-title-input');
        change_article.simulate('change',{target:{value:content}});
        change_title.simulate('change',{target:{value:title}});
        const wrapper=component.find('#confirm-create-article-button');
        
        wrapper.simulate('click');
        
        expect(spycreatenewarticle).toBeCalledTimes(1);
      })
  

      it('shoud logout properly',()=>{
        const spylogout=jest.spyOn(actionCreators,'logout')
        .mockImplementation(()=>{return dispatch=>{}});
        const component=mount(create);
        const wrapper=component.find('#logout-button');
        wrapper.simulate('click');
        expect(spylogout).toBeCalledTimes(1);
    });
    afterEach(() => { jest.clearAllMocks() });
  })
