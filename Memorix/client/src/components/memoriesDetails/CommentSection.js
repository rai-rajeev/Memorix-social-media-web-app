import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch} from 'react-redux';

import { commentPost } from '../../services/memories';
import './memoriesDetails.css';


const CommentSection = ({ currentpost }) => {
  const user = JSON.parse(localStorage.getItem('Profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  let comments=currentpost.comments;
  const commentsRef = useRef();

  const handleComment = async () => {
    dispatch(commentPost({commentedBy:user?.result?.name,comment}, currentpost._id));
    setComment('');
    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className="commentsOuterContainer">
        <div className="commentsInnerContainer">
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments?.map((c) => (
            <Typography key={c._id} gutterBottom variant="subtitle1">
              <strong>{c.commentedBy}</strong>
              <br/>
              {c.comment}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
        <div style={{ width: '50%' }}>
          <Typography gutterBottom variant="h6">Write a comment</Typography>
          <TextField fullWidth rows={4} variant="outlined" label="Comment" multiline value={comment} onChange={(e) => setComment(e.target.value)} />
          <br />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment.length||!localStorage.getItem("Profile")} color="primary" variant="contained" onClick={handleComment}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;