import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar/navbar';
import Home from './components/home/home';
import PostDetails from './components/memoriesDetails/memoriesDetails'
import CreatorOrTag from'./components/createOrTag/createOrTag';
import Auth from './components/Auth/auth';
function App() {
  return (
    <BrowserRouter>
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path="/" exact element={ <Navigate to="/posts" />} />
        <Route path="/posts" exact element={<Home/>} />
        <Route path="/posts/search" exact element={<Home/>} />
        <Route path="/posts/:id" exact element={<PostDetails/>} />
        <Route path="/creators/:name" element={<CreatorOrTag/>} />
        <Route path="/tags/:name" element={<CreatorOrTag/>} />
        <Route path="/auth" exact element={(!((localStorage.getItem("Profile"))?.result)? <Auth /> : <Navigate to="/posts" />)} />
      </Routes>
    </Container>
  </BrowserRouter>
  );
}

export default App;
