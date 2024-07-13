import React, { useState } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {MuiChipsInput as ChipInput} from 'mui-chips-input';

import { getPostsBySearch } from '../../services/memories';
import Posts from '../memories/memories';
import Form from '../Form/form';
import Pagination from '../memories/Pagination';
import './home.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Home = () => {
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  // const handleChange=(tag)=>setTags([...tags,tag]);

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className="grid-Container">
          <Grid item xs={12} sm={6} md={9}  display={'flex'} justifyContent={'space-between'} flexDirection={'column'}>
           
            <Posts setCurrentId={setCurrentId} />
          
            {(!searchQuery && !tags.length) && (
              <Paper className="home-pagination" elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className="home-appBarSearch" position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAddChip={(chip)=>handleAddChip(chip)}
                onDeleteChip={(chip)=>handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className="home-search-btn" variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            
          </Grid>
         
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;