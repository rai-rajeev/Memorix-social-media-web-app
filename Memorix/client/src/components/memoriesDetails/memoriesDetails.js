
import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../services/memories';
import CommentSection from './CommentSection';
import './memoriesDetails.css';


const Post = () => {
  const {post,posts, isLoading } = useSelector((state) => state.mem);
  // console.log(post);
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);
  // console.log(id);
  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className="loadingPaper-memory">
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px', }} elevation={6}>
      <div className="memory-card">
        <div className="memory-section">
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag,index) => (
            <Link to={`/tags/${tag}`} key={index}style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` #${tag} `}
            </Link>
          ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${post.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${post.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection currentpost={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className="imageSection">
            
        {(post.isVideo)?
            <video className='memory-media' controls={true} src={post.selectedFile} atl ={post.title}/>:<img className="memory-media" src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        }
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className="memory-section">
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className="recommendedPosts">
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id ,isVideo}) => (
              <div  style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                if({!isVideo})<img src={selectedFile} width="200px" alt={title} />
                else <video src={selectedFile} width="200px" alt={title}/>
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;
