import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddPost from './pages/AddPost';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';

function App() {
  const isLogin = useSelector((state) => state.user.is_login);

  return (
    <>
      <Navbar isLogin={isLogin} />
      <Routes>
        <Route path="/" element={<Main isLogin={isLogin} />} />
        <Route path="/post" element={<AddPost />} />
        <Route path="/edit/:postId" element={<AddPost />} />
        <Route path="/post/:postId" element={<Detail />} />
        <Route path="/register" element={<Register isLogin={isLogin} />} />
        <Route path="/login" element={<Login isLogin={isLogin} />} />
      </Routes>
    </>
  );
}

export default App;
