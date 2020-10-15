import React from 'react';
import CreateDetail from './CreateDetail';
import Adapter from 'enzyme-adapter-react-16';
import {shallow,configure} from 'enzyme';
configure({ adapter: new Adapter() });


describe('CreateDetail',()=>{
    afterEach(() => { jest.clearAllMocks() });
    
    it('shoud render properly',()=>{
        const component=shallow(<CreateDetail author='a' content='b' title='d' />);
        expect(component.find('.createdetail').length).toBe(1);

    })
})