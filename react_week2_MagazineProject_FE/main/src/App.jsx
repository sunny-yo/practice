import { lazy, Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import Navbar from './components/Navbar';
import { getPostAxios, setNewPaging } from './redux/modules/post';
import { getUser } from './redux/modules/user';
import ErrorBoundary from './ErrorBoundary';

const Main = lazy(() => import('./pages/Main'));
const AddPost = lazy(() => import('./pages/AddPost'));
const Detail = lazy(() => import('./pages/Detail'));
const Register = lazy(() => import('./pages/Register'));
const Login = lazy(() => import('./pages/Login'));
const Loading = lazy(() => import('./pages/Loading'));

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.post.isLoading);
  const isLogin = useSelector(state => state.user.is_login);
  const isToken = sessionStorage.getItem('token') ? true : false;

  useEffect(() => {
    isToken && dispatch(getUser());
    dispatch(setNewPaging());
    dispatch(getPostAxios());
  }, [isLogin, isToken]);

  console.log(isLoading);

  return (
    <>
      {isLoading && <Loading />}
      <Navbar isLogin={isLogin} />
      <ErrorBoundary fallback={<Loading />}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path='/' element={<Main isLogin={isLogin} />} />
            <Route path='/post' element={<AddPost />} />
            <Route path='/edit/:postId' element={<AddPost />} />
            <Route path='/post/:postId' element={<Detail />} />
            <Route path='/register' element={<Register isLogin={isLogin} />} />
            <Route path='/login' element={<Login isLogin={isLogin} />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
