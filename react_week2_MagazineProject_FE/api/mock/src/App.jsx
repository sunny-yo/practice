import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AddPost from './pages/AddPost';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Main from './pages/Main';
import Register from './pages/Register';
import { getPostAxios, getPostFB, setNewPaging } from './redux/modules/post';
import { getUser } from './redux/modules/user';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.is_login);
  const isToken = sessionStorage.getItem('token') ? true : false;

  useEffect(() => {
    isToken && dispatch(getUser());
    dispatch(setNewPaging());
    dispatch(getPostAxios());
  }, [isLogin, isToken]);

  return (
    <>
      <Navbar isLogin={isLogin} />
      <Routes>
        <Route path='/' element={<Main isLogin={isLogin} />} />
        <Route path='/post' element={<AddPost />} />
        <Route path='/edit/:postId' element={<AddPost />} />
        <Route path='/post/:postId' element={<Detail />} />
        <Route path='/register' element={<Register isLogin={isLogin} />} />
        <Route path='/login' element={<Login isLogin={isLogin} />} />
      </Routes>
    </>
  );
}

export default App;
