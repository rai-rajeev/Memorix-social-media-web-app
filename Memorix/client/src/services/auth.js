import * as api from'./remoteServices/api'
import * as GoogleApi from './remoteServices/GoogleApi';
import { Auth } from '../Redux/actions';
export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch(Auth(data));

    router('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const  {data}  = await api.signUp(formData);

    dispatch(Auth(data));

    router('/');
  } catch (error) {
    console.log(error);
  }
};
export const googleSignIn=(response,router)=>async (dispatch)=>{
  try {
    const  profiledata=await GoogleApi.gooleprofiledata(response);
    console.log( profiledata );
    const  {data}=await api.googleLogin(profiledata.data);
    dispatch(Auth(data));
    console.log(data);
    router('/');
    
  }
  catch(error){
    console.log(error);
  }
}