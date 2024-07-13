import * as actionTypes from "../constant/actionTypes";

export const Create = (data) => {
  return {
    type: actionTypes.CREATE,
    payload:data
  };
};

export const Update = (data) => {
  return { type: actionTypes.UPDATE,payload:data };
};

export const Delete = (id) => {
  return { type: actionTypes.DELETE,payload:id };
};

export const Auth = (data) => {
  return { type: actionTypes.AUTH ,data};
};

export const fetchAll = (data) => {
  return { type: actionTypes.FETCH_ALL,payload:data };
};

export const endLoading = () => {
  return { type: actionTypes.END_LOADING };
};

export const comment = (data) => {
  return { type: actionTypes.COMMENT,payload:data };
};

export const fetchByCreator = (data) => {
  return { type: actionTypes.FETCH_BY_CREATOR,payload:{data} };
};

export const fetchBySearch = (data) => {
  return { type: actionTypes.FETCH_BY_SEARCH ,payload:{data}};
};

export const fetchPost = (data) => {
  return { type: actionTypes.FETCH_POST,payload:{post:data} };
};

export const like = (data) => {
  return { type: actionTypes.LIKE,payload:data };
};

export const logout = () => {
  return { type: actionTypes.LOGOUT };
};

export const startLoading = () => {
    return { type: actionTypes.START_LOADING };
};
  
