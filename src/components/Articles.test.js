import React from 'react';
import {shallow,configure} from 'enzyme';

import Articles from './Articles';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
describe('Articles',()=>{
    afterEach(() => { jest.clearAllMocks() });
    
    it('should render properly',()=>{
        const component=shallow(<Articles author_id='2' title='a' content='d'/>);
        const wrapper=component.find('.Article');
        expect(wrapper.length).toBe(1);
    })
})