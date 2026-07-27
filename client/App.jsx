import { useState } from 'react';
import './App.css';
import Homepage from './src/pages/Homepage';
import Dashboard from './src/pages/Dashboard.jsx';
import ProjectEditor from './src/pages/CreateProject.jsx';
import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
import Page404 from './src/pages/Page404.jsx';
import LoginPage from './src/pages/LoginPage.jsx';
import { ProtectedDashboardRoute, ProtectedLoginRoute, authenticateUser } from './src/componets/auth/Auth.jsx';
import CreateProject from './src/pages/CreateProject.jsx';
import { jwtDecode } from 'jwt-decode';
import CreateUser from './src/pages/CreateUser.jsx';
import About from './src/pages/About.jsx';
import Contact from './src/pages/Contact.jsx';
import Blog from './src/pages/Blog.jsx';
import CreateBlog from './src/pages/CreateBlog.jsx';
import ProjectViewMore from './src/pages/ProjectViewMore.jsx';
import BlogViewMore from './src/pages/BlogViewMore.jsx';



const router = createBrowserRouter([
  { path: '/', element:<Homepage/> },
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
    {path:`/project/:id`,
      element:<ProjectViewMore/>},
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
  {path:'/blogs', element:<Blog/>},
  {path:'/blogs/:id', element:<BlogViewMore/>},
  { path: '*', element: <Page404/> },
])




function App() {
  return (<RouterProvider router={router}/>);
}


export default App
