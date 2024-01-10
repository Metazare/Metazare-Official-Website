import React, { createContext, useState, useEffect, useContext } from 'react';
import {useNavigate, Outlet, Navigate} from 'react-router-dom';

import {auth, googleProvider} from "../Config/Firebase";
import { createUserWithEmailAndPassword,signInWithPopup ,signOut,signInWithCredential,onAuthStateChanged} from 'firebase/auth';

interface AuthContextState {
  user: any;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>(
  {
    user: null,
    signUp: async (email: string, password: string) => {},
    signInWithGoogle: async () => {},
    signout: async () => {}
  }
)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(currentUser)
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth]);


  const signUp = async (email:string,password:string) =>{
    try{
      await createUserWithEmailAndPassword(auth,email,password)
    }catch(err){
      console.log(err)
    }finally{
      navigate("/admin")
    }
  }

  const signInWithGoogle = async () =>{
    try{
      await signInWithPopup(auth,googleProvider)
    }catch(err){
      console.log(err)
    }finally{
      navigate("/admin")
    }
  }
  const signout = async () =>{
    try{
      await signOut(auth)
    }catch(err){
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{user,signUp,signInWithGoogle,signout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}


interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {

  // * Gets locally stored user
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : '';
  const type = user.type

  return (
    
    // Checks if user exists
    user
      // Checks if allowed roles are defined
      ? allowedRoles 
          // Checks if user type is part of allowed roles
          ? allowedRoles?.includes(type)
              ? <Outlet/>
              // Redirects to forbidden if user is not allowed
              : <Navigate to="/forbidden"/>
          : <Outlet/>   
      // Redirects to login if not logged in
      : <Navigate to="/login"/>
  );
};