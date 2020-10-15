import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';


const getMockReducer= jest.fn(
    initialState=>(state=initialState,action)=>{
        switch(action.type){
            default:
                break;    
        }
        return state;
    }
);


export const getMockStore=(initialState)=>{
    const MockReducer=getMockReducer(initialState);
    const rootReducer=combineReducers({
        at:MockReducer,   
    });
    const mockStore=createStore(rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
          ));
    return mockStore;
}

