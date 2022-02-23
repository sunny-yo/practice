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
import { getPostFB, setNewPaging } from './redux/modules/post';
import { getUserFB } from './redux/modules/user';

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.is_login);
  const sessionKey = `firebase:authUser:${process.env.REACT_APP_API_KEY}:[DEFAULT]`;
  const isSession = sessionStorage.getItem(sessionKey) ? true : false;

  useEffect(() => {
    isSession && dispatch(getUserFB());
    dispatch(setNewPaging());
    dispatch(getPostFB());
  }, [isLogin]);

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
