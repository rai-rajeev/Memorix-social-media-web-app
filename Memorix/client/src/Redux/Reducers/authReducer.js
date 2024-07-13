import * as actionTypes from'../../constant/actionTypes';
const initialState={authData:null};
const authReducer=(state=initialState,action)=>{
    
    switch(action.type){
        case actionTypes.AUTH:
        const data=JSON.stringify(action.data);
        localStorage.setItem('Profile',data);
        return {...state, authData: action.data, loading: false, errors: null};
        case actionTypes.LOGOUT:
            localStorage.clear();
            return {...state,authData:null};
        default:
            return state;
    }
}

export default authReducer;