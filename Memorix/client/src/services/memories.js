import {
  startLoading,
  fetchPost,
  fetchByCreator as fetchPostsByCreator,
  fetchBySearch,
  fetchAll,
  endLoading,
  Create,
  Update,
  like,
  comment,
  Delete,
} from "../Redux/actions";
import * as api from'./remoteServices/api';
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch(startLoading());

    const { data } = await api.fetchPost(id);

    dispatch(fetchPost(data));
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchPosts(page);

    dispatch(fetchAll({data,currentPage,numberOfPages}));
    console.log(data);
    dispatch(endLoading());
  } catch (error) {
    console.log(error);

    dispatch(endLoading());
  }
};

export const getPostsByCreator = (name) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const {
      data: { data },
    } = await api.fetchPostsByCreator(name);

    dispatch(fetchPostsByCreator(data));
    dispatch(endLoading());
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const {
      data: { data },
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch(fetchBySearch(data));
    dispatch(endLoading());
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post, history) => async (dispatch) => {
  try {
    dispatch(startLoading());
    console.log(post);
    let formData=new FormData();
    for( let k in post){
      if(k!=='selectedFile')
      formData.append(k.toString(),post[k].toString());
      else{
        formData.append(k.toString(),post[k]);
      }
    }
    console.log(formData);
    const { data } = await api.createPost(formData);
    dispatch(Create(data));

    history(`/posts/${data._id}`);
    dispatch(endLoading());
  } catch (error) {
    dispatch(endLoading());
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch(Update(data));
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));

  try {
    const { data } = await api.likePost(id, user?.token);

    dispatch(like(data));
  } catch (error) {
    console.log(error);
  }
};

export const commentPost = (value, id) => async (dispatch) => {
  try {
    const { data } = await api.comment(value, id);

    dispatch(comment(data));

    return data.comments;
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch(Delete(id));
  } catch (error) {
    console.log(error);
  }
};
