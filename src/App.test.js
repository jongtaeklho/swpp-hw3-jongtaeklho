import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { getMockStore } from './test-units/mocks';
import{shallow,mount,configure} from 'enzyme';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const initialstate={
  user:[{logged_in:true},{logged_in:false}],
  selected_article:null,
  articles:[],
  comments:[], 
}

const mockStore=getMockStore(initialstate)


describe('App',()=>{
    let app;
    
    beforeEach(()=>{
      app=(
        <Provider store={mockStore}>
          <App></App>
          
        </Provider>
      );
    });
    it('should render',()=>{
      const component=mount(app);
      
      expect(component.find('.App').length).toBe(1);
    });
    it('shoud redirect login to articles',()=>{
     
      const component=mount(app);

      expect(component.find(".redirect").length).toBe(2);
    })
});



