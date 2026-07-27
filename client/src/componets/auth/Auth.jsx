import { createContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';  


//This helper component is used to protect routes that require authentication.
//It checks if a token exists in localStorage and either renders the child components or redirects to the login page.

export const ProtectedDashboardRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

export const ProtectedLoginRoute = ({children}) =>{
  const token = localStorage.getItem("token");
  return token ? children :<Navigate to="/dashboard"/>
}

 export async function authenticateUser(){
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
    }

