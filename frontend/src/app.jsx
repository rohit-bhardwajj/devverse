import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';
import LoginPage from './pages/Auth/LoginPage/LoginPage';
import ForgetPasswordPage from './pages/Auth/ForgetPasswordPage/ForgetPasswordPage';
import AllBlogsPage from './pages/AllBlogsPage/AllBlogsPage';
import ProfilePage from './pages/User/ProfilePage/ProfilePage';
import UpdateProfile from './pages/User/UpdateProfile/UpdateProfile';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import UserPrivateRoutes from './components/Routes/UserPrivateRoutes';
import LikedPage from './pages/User/LikedPage/LikedPage';
import CommentedPage from './pages/User/CommentedPage/CommentedPage';
import AdminPrivateRoutes from './components/Routes/AdminPrivateRoutes';
import AdminProfilePage from './pages/Admin/AdminProfilePage/AdminProfilePage';
import AdminUpdateBlog from './pages/Admin/AdminUpdateBlog/AdminUpdateBlog';
import AdminCreateBlog from './pages/Admin/AdminCreateBlog/AdminCreateBlog';
import AdminManageCategory from './pages/Admin/AdminManageCategory/AdminManageCategory';
import AdminAllBlogs from './pages/Admin/AdminAllBlogs/AdminAllBlogs';
import BlogPage from './pages/BlogPage/BlogPage';
import ContactPage from './pages/ContactPage/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicyPage/PrivacyPolicyPage';
import LoadingBar from "react-top-loading-bar";
import { useProgress } from './context/topLoaderProgress';
import axios from 'axios';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';

function App() {

  const [progress, setProgress] = useProgress();
  // const [databaseConnected, setDatabaseConnected] = useState(false);


  return (
    <>

      <LoadingBar progress={progress} shadow={true} height={3} transitionTime={500} color="var(--loading-bar-gradient)" waitingTime={300} />

      {/* {databaseConnected ? ( */}

      <Routes>

        {/* header main routes  */}
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/all-blogs' element={<AllBlogsPage />} />

        <Route path='/blog/:slug' element={< BlogPage />} />

        {/* auth routes  */}
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/forget-password' element={<ForgetPasswordPage />} />

        {/* user routes  */}
        {/* <Route path='/user/dashboard' element={<ProfilePage />} /> */}

        <Route path="/user" element={<UserPrivateRoutes />}>
          <Route path="dashboard" element={<ProfilePage />} />
          <Route path="update-profile" element={<UpdateProfile />} />
          <Route path='liked-articles' element={<LikedPage />} />
          <Route path='commented-post' element={<CommentedPage />} />
        </Route>

        <Route exact="true" path="/admin" element={<AdminPrivateRoutes />}>
          <Route exact="true" path="dashboard" element={<AdminProfilePage />} />
          <Route exact="true" path="update-blog/:slug" element={<AdminUpdateBlog />} />
          <Route exact="true" path='create-blog' element={<AdminCreateBlog />} />
          <Route exact="true" path='manage-categories' element={<AdminManageCategory />} />
          <Route exact="true" path='allblogs' element={<AdminAllBlogs />} />
        </Route>

        {/* footer main routes  */}
        {/* <Route path='/contact' element={<ContactPage />} /> */}
        {/* <Route path='/contact' element={<PrivacyPage />} /> */}

        <Route path='*' element={<PageNotFound />} />
      </Routes>

      {/* ) : (
        <LoadingScreen /> // Show the loading screen until connected
      )} */}


    </>
  );
}

export default App;
