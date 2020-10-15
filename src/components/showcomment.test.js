import React from 'react';
import {shallow,configure} from 'enzyme';
import Showcomment from './showcomment';

import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('Showcomment',()=>{
    afterEach(() => { jest.clearAllMocks() });
    
    it('should render',()=>{
        const component=shallow(<Showcomment/>);
        expect(component.find('.showcomment').length).toBe(1);

    });
    it('should show create, deletbutton',()=>{
        const mockclickedit=jest.fn();
        const mockclickdelete=jest.fn();
        const component=shallow(<Showcomment cur_id='id' author_id='id' clicked={mockclickedit} 
        deleteclicked={mockclickdelete}/>)
        
        expect(component.find('button').length).toBe(2);
        const edit_button=component.find('#edit-comment-button');
        const delete_button=component.find('#delete-comment-button');
        
        edit_button.simulate('click');
        delete_button.simulate('click');
        
        expect(mockclickdelete).toHaveBeenCalledTimes(1);
        expect(mockclickdelete).toHaveBeenCalledTimes(1);
    })
    it('should show create, deletbutton',()=>{
        const component=shallow(<Showcomment cur_id='id' author_id='idd'/>)
        expect(component.find('button').length).toBe(0);

    })
})