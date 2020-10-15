import React from 'react';
import Create from './Create';
import {mount,configure} from 'enzyme';
import {getMockStore} from '../test-units/mocks';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import{Provider} from 'react-redux';
import * as actionCreators from '../actions/articles';
import ArticleEdit from './ArticleEdit';
import Login from './Login'
configure({ adapter: new Adapter() });
const initialstate={
    user:[{email:'id1',password:'pw1',logged_in:true},{email:'id2',password:'pw2',logged_in:false}],
    selected_article:null,
    articles:[{title:'testtitle',content:'testcontent',id:0,author_id:'testauthor'}],
    comments:[], 
  }



const mockStore=getMockStore(initialstate);
describe('ArticleEdit',()=>{
    let articleedit,spygetdetailarticle;
    beforeEach(()=>{
        articleedit=(
            <Provider store={mockStore}>
                <BrowserRouter>
                <Switch>
                    <Route path='/' component={ArticleEdit}></Route>
                    <Route path='/articles/:id' exact component={ArticleEdit}></Route>
                </Switch>
                </BrowserRouter>
            </Provider>
        );
        spygetdetailarticle=jest.spyOn(actionCreators,'getdetailarticle')
        .mockImplementation(()=>{return dispatch=>{}});
        
    })
    afterEach(() => { jest.clearAllMocks() });
    
    it('should render properly',()=>{
        const component=mount(articleedit);
        expect(component.find('.articleedit').length).toBe(1);
        expect(spygetdetailarticle).toBeCalledTimes(1);
    });
    it('should match id',()=>{
        const mockHistory={push:jest.fn()}
        const component=mount(
            <Provider store={mockStore}>
                <ArticleEdit match={{params:{id:'0'}}} history={mockHistory}></ArticleEdit>
            </Provider>
        );
        const EditInstance=component.find(ArticleEdit.WrappedComponent).instance();
        expect(EditInstance.state.title).toEqual('testtitle');
        expect(EditInstance.state.content).toEqual('testcontent');
        expect(EditInstance.state.author_id).toEqual('testauthor');

        });
    it('should operate back button properly',()=>{
            const mockConfrim=jest.spyOn(window, 'confirm' ).mockReturnValueOnce(true);
            const mockHistory={push:jest.fn()}
            const component=mount(
                <Provider store={mockStore}>
                    <ArticleEdit match={{params:{id:'0'}}} history={mockHistory}></ArticleEdit>
                </Provider>
        );
        const title='modifiedtitle';
        const edit_title=component.find('#article-title-input');
        edit_title.simulate('change',{target:{value:title}});


        const wrapper=component.find('#back-edit-article-button');
        wrapper.simulate('click');
        expect(mockConfrim).toBeCalledTimes(1);
        });

    it('should go back properly',()=>{
        const component=mount(articleedit);
        const wrapper=component.find('#back-edit-article-button');
        wrapper.simulate('click');
        expect(component.find('.articleedit').length).toBe(1);
    })
    it('should change mode preview',()=>{
        const component=mount(articleedit);
        const wrapper=component.find('#preview-tab-button');
        wrapper.simulate('click');
        const EditInstance=component.find(ArticleEdit.WrappedComponent).instance();
        expect(EditInstance.state.mode).toEqual('preview');
    });
    it('should change mode write',()=>{
        const component=mount(articleedit);
        const wrapper=component.find('#write-tab-button');
        wrapper.simulate('click');
        const EditInstance=component.find(ArticleEdit.WrappedComponent).instance();
        expect(EditInstance.state.mode).toEqual('write');
    });
    it('should change title properly',()=>{
        const title='SpyTitle';
        const component=mount(articleedit);
        const wrapper=component.find('#article-title-input');
        wrapper.simulate('change',{target:{value:title}});
        const EditInstance=component.find(ArticleEdit.WrappedComponent).instance();
        expect(EditInstance.state.title).toEqual(title);
      
    })
    it('should change content properly',()=>{
        const content='content';
        const component=mount(articleedit);
        const wrapper=component.find('#article-content-input');
        wrapper.simulate('change',{target:{value:content}});
        const EditInstance=component.find(ArticleEdit.WrappedComponent).instance();
        expect(EditInstance.state.content).toEqual(content);
      
    })
    
    it('should edit article properly',()=>{
        const spyeditarticle=jest.spyOn(actionCreators,'editarticle')
        .mockImplementation(()=>{return dispatch=>{}});
        const component=mount(articleedit);
        const wrapper=component.find('#confirm-edit-article-button');
        wrapper.simulate('click');
        expect(spyeditarticle).toBeCalledTimes(1);
    })
    it('shoud logout properly',()=>{
        const spylogout=jest.spyOn(actionCreators,'logout')
        .mockImplementation(()=>{return dispatch=>{}});
        const component=mount(articleedit);
        const wrapper=component.find('#logout-button');
        wrapper.simulate('click');
        expect(spylogout).toBeCalledTimes(1);
    });
    afterEach(() => { jest.clearAllMocks() });


})