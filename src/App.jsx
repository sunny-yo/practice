import PostList from './pages/PostList';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddPost from './pages/AddPost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/create" element={<AddPost />} />
        <Route path="/update/:postid" element={<AddPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
