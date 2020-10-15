import React from 'react';
import {shallow,mount,configure} from 'enzyme';
import Login from './Login';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch,Route } from 'react-router-dom';
import * as actionCreators from '../actions/articles';
import {getMockStore} from '../test-units/mocks';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
const initialstate={
    user:[{email:'id1',password:'pw1',logged_in:false},{email:'id2',password:'pw2',logged_in:false}],
    selected_article:null,
    articles:[],
    comments:[], 
  }
  

  const mockStore=getMockStore(initialstate);


  describe('Login',()=>{

    let login,spyGetstart;
    beforeEach(()=>{
        login=(
            <Provider store={mockStore}>
                <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Login}/>
                </Switch>
                </BrowserRouter>
            </Provider>
        );
        spyGetstart=jest.spyOn(actionCreators,'getstart')
        .mockImplementation(()=>{return dispatch=>{}});
    });
    afterEach(() => { jest.clearAllMocks() });
    
    it('should render',()=>{
        const component=mount(login);
        expect(component.find('.login').length).toBe(1);
        expect(spyGetstart).toBeCalledTimes(1);
    });
    it('shoud set the state properly email',()=>{
        const email='id1';
        const component=mount(login);
        const wrapper=component.find('#email-input');
        wrapper.simulate('change',{target:{value:email}});
        const loginInstance=component.find(Login.WrappedComponent).instance();
        expect(loginInstance.state.email).toEqual(email);
        expect(loginInstance.state.pw).toEqual("");
        
    });
    it('shoud set the state properly pw',()=>{
        const password='pw';
        const component=mount(login);
        const wrapper=component.find('#pw-input');
        wrapper.simulate('change',{target:{value:password}});
        const loginInstance=component.find(Login.WrappedComponent).instance();
        expect(loginInstance.state.pw).toEqual(password);
        expect(loginInstance.state.email).toEqual("");
        
    });
    it('shoud login properly',()=>{
        const spygetLogin=jest.spyOn(actionCreators,'getLogin')
        .mockImplementation(()=>{return dispatch=>{}});
        const email='id2';
        const pw='pw3';
        const component=mount(login);
        const email_change=component.find('#email-input');
        const pw_change=component.find('#pw-input');
        email_change.simulate('change',{target:{value:email}});
        pw_change.simulate('change',{target:{value:pw}});
        const login_button=component.find('#login-button');
        login_button.simulate('click');

    })

    it('shoud login properly',()=>{
        const spygetLogin=jest.spyOn(actionCreators,'getLogin')
        .mockImplementation(()=>{return dispatch=>{}});
        const email='id1';
        const pw='pw1';
        const component=mount(login);
        const email_change=component.find('#email-input');
        const pw_change=component.find('#pw-input');
        email_change.simulate('change',{target:{value:email}});
        pw_change.simulate('change',{target:{value:pw}});
        const login_button=component.find('#login-button');
        login_button.simulate('click');
        expect(spygetLogin).toBeCalledTimes(1);
        


    })
    
  })
  