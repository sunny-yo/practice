import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './elements/Navbar';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Main from './pages/Main';
import Post from './pages/Post';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post" element={<Post />} />
        <Route path="/edit/:postId" element={<Post />} />
        <Route path="/post/:postId" element={<Detail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
