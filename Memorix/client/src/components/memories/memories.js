import React from 'react';
import { Grid, CircularProgress,Container} from '@mui/material';
import { useSelector } from 'react-redux';
import Post from './memory/memory';
import './memories.css';
const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.mem);
  if (!posts.length && !isLoading) return <Container className='No-posts-container'>"No Memories Yet  </Container>;

  return (
    isLoading ? <Container className='No-posts-container'><CircularProgress/> </Container> : (
      <Grid className={"memories-container"} container alignItems="stretch" spacing={3}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;