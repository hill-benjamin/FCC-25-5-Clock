import { combineReducers } from 'redux';

const createTimerReducer = (id, initialState) => (state = {id, count: initialState}, action) => {
    if(action.id !== id){
        return state;
    }

    switch(action.type){
        case 'INCREMENT':
            return{
                ...state,
                count: state.count < 60 ? state.count + 1 : state.count,
            };
        case 'DECREMENT':
            return{
                ...state,
                count: state.count > 1 ? state.count - 1 : state.count,
            }
        case 'RESET_COUNTDOWN': 
            return{ 
                ...state, 
                count: initialState,
            }
        default:
            return{
                state
            }    
    }

}

const countdownReducer = (state = {isRunning: false,}, action) => {
    switch(action.type){
        case 'START_COUNTDOWN': return {...state, isRunning: true}; 
        case 'STOP_COUNTDOWN': return {...state, isRunning: false};
        case 'RESET_COUNTDOWN': return {...state, isRunning: false};
        default: return state;    
    }
}

const breakTimeReducer = createTimerReducer('breakTime', 5)
const sessionTimeReducer = createTimerReducer('sessionTime', 25)

const rootReducer = combineReducers({
    breakTimeReducer,
    sessionTimeReducer,
    countdownReducer
})

export default rootReducer;