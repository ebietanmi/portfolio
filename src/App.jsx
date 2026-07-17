import { useState } from 'react';
import './App.css';
import Homepage from './client/pages/Homepage.jsx';
import Dashboard from './client/pages/Dashboard.jsx';
import ProjectEditor from './client/pages/CreateProject.jsx';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Page404 from './client/pages/Page404.jsx';
import LoginPage from './client/pages/LoginPage.jsx';
import { ProtectedDashboardRoute, ProtectedLoginRoute, authenticateUser } from './client/componets/auth/Auth.jsx';
import CreateProject from './client/pages/CreateProject.jsx';
import { jwtDecode } from 'jwt-decode';
import CreateUser from './client/pages/CreateUser.jsx';
import About from './client/pages/About.jsx';
import Contact from './client/pages/Contact.jsx';
import Blog from './client/pages/Blog.jsx';
import CreateBlog from './client/pages/CreateBlog.jsx';
import PreviewProject from './client/pages/PreviewProject.jsx';



const router = createBrowserRouter([
  { path: '/', element: <Homepage/> },
  { path: '/login', element: <LoginPage/> },
  { path: '/dashboard', 
    loader: async ()=>{
      const token = localStorage.getItem("token");
      if(!token) redirect('/login');
      try {
        const decodedToken = jwtDecode(token);
        if(decodedToken.exp * 1000 < Date.now()){
          localStorage.removeItem("token")
          return redirect('/login')
        }
        else return {username:decodedToken.username}

      } catch (error) {
        localStorage.removeItem('token')
        return redirect('/login')
      }
    },
    element: <Dashboard/> },
    {path:`/dashboard/project/:id`,
      element:<PreviewProject/>},
    {path:'/dashboard/create-user',
      loader:async ()=>{
      const token = localStorage.getItem("token");
      if(!token) redirect('/login');
      try {
        const decodedToken = jwtDecode(token);
        if(decodedToken.exp * 1000 < Date.now()){
          localStorage.removeItem("token")
          return redirect('/login')
        }
        else return {username:decodedToken.username}

      } catch (error) {
        localStorage.removeItem('token')
        return redirect('/login')
      }
    },
    element:<CreateUser/>},
  { path: '/dashboard/create-project', element: <CreateProject/> },
  { path: '/about', element: <About/> },
  { path: '/dashboard/create-blog',
     loader: async ()=>{
      const token = localStorage.getItem("token");
      if(!token) redirect('/login');
      try {
        const decodedToken = jwtDecode(token);
        if(decodedToken.exp * 1000 < Date.now()){
          localStorage.removeItem("token")
          return redirect('/login')
        }
        else return {username:decodedToken.username}

      } catch (error) {
        localStorage.removeItem('token')
        return redirect('/login')
      }
    },
    element: <CreateBlog/> },
  {path:'/contact', element:<Contact/>},
  {path:'/blog', element:<Blog/>},
  { path: '*', element: <Page404/> },
])




function App() {
  return (<RouterProvider router={router}/>);
}


export default App
