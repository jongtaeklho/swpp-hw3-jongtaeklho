import React from 'react';
import Create from './Create';
import {mount,configure} from 'enzyme';
import {getMockStore} from '../test-units/mocks';
import Adapter from 'enzyme-adapter-react-16';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom';
import{Provider} from 'react-redux';
import * as actionCreators from '../actions/articles';
import ArticleDetail from './ArticleDetail';
import Login from './Login'
configure({ adapter: new Adapter() });
const initialstate={
    user:[{email:'id1',password:'pw1',logged_in:true,id:0,name:'testauthor'},{name:'ddd',email:'id2',password:'pw2',logged_in:false}],
    selected_article:null,
    articles:[{title:'testtitle',content:'testcontent',id:0,author_id:0}],
    comments:[{id:0,article_id:0,author_id:0,content:'dddd'}], 
  }
  jest.mock('./showcomment', () => {
    return jest.fn(props => {
      return (
        <div className="spyshowcomment">
          
          <button className="editbutton" onClick={props.clicked} />
          <button className="deleteButton" onClick={props.deleteclicked} />
        </div>);
    });
  });
  




const mockStroe=getMockStore(initialstate);

describe('ArticleDetail',()=>{
    let articledetail,spygetcomment;
    beforeEach(()=>{
        articledetail=(
            <Provider store={mockStroe}>
                <BrowserRouter>
                <Switch>
                    <Route path='/' component={ArticleDetail}></Route>
                </Switch>
                </BrowserRouter>
            </Provider>
        );
        spygetcomment=jest.spyOn(actionCreators,'getcomment')
        .mockImplementation(()=>{return dispatch=>{}});

    })
    it('shoud render properly',()=>{
        const component=mount(articledetail);
        expect(component.find('.articledetail').length).toBe(1);
        expect(spygetcomment).toBeCalledTimes(1);
    });
    it('should confirm comment properly',()=>{
        const comment='testcomment';
        const spycreatenewcomment=jest.spyOn(actionCreators,'createnewcomment')
        .mockImplementation(()=>{return dispatch=>{}});
        const component=mount(articledetail);
        const change_comment=component.find('#new-comment-content-input');
        change_comment.simulate('change',{target:{value:comment}});
        const getInstance=component.find(ArticleDetail.WrappedComponent).instance();
        expect(getInstance.state.comment).toEqual(comment);
        const wrapper=component.find('#confirm-create-comment-button');
        wrapper.simulate('click');
        expect(spycreatenewcomment).toBeCalledTimes(1);
    });
    it('should delete article properly',()=>{
        const spydeletearticle=jest.spyOn(actionCreators,'deletearticle')
        .mockImplementation(()=>{return dispatch=>{}});
        const component=mount(
            <Provider store={mockStroe}>
                <BrowserRouter>
                <ArticleDetail match={{params:{id:'0'}}}/>
                </BrowserRouter>
            </Provider>
        );
        const wrapper=component.find('#delete-article-button');
        wrapper.simulate('click');
        expect(spydeletearticle).toBeCalledTimes(1);
    });
    it('should delete article properly',()=>{
        const spygetdetailarticle=jest.spyOn(actionCreators,'getdetailarticle')
        .mockImplementation(()=>{return dispatch=>{}});
        const component=mount(
            <Provider store={mockStroe}>
                <BrowserRouter>
                <ArticleDetail match={{params:{id:'0'}}}/>
                </BrowserRouter>
            </Provider>
        );
        const wrapper=component.find('#edit-article-button');
        wrapper.simulate('click');
        expect(spygetdetailarticle).toBeCalledTimes(1);
    });
    it('should delete comment properly',()=>{
        const spydeletecomment=jest.spyOn(actionCreators,'deletecomment')
        .mockImplementation(()=>{return dispatch=>{}});
        const component=mount(
            <Provider store={mockStroe}>
                <BrowserRouter>
                <ArticleDetail match={{params:{id:'0'}}}/>
                </BrowserRouter>
            </Provider>
        );
        const wrapper=component.find('.spyshowcomment .deleteButton');
        wrapper.simulate('click');
        expect(spydeletecomment).toBeCalledTimes(1);
    });
        
})