import React, { createContext, useState, useEffect, useContext } from 'react';
import {useNavigate, Outlet, Navigate} from 'react-router-dom';

import {auth, googleProvider} from "../Config/Firebase";
import { createUserWithEmailAndPassword,signInWithPopup ,signOut,onAuthStateChanged,signInWithEmailAndPassword} from 'firebase/auth';

interface AuthContextState {
  user: any;
  error:any;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>(
  {
    user: null,
    error: null,
    signUp: async (email: string, password: string) => {},
    signInWithGoogle: async () => {},
    signout: async () => {},
    signIn: async () => {}
  }
)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null);
  const [error,setError] = useState<any>(null);
  useEffect(() => {
    setError(null)
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      await setUser(currentUser);
      console.log(currentUser)
      if(currentUser === null && window.location.href.includes("admin")){
        navigate("/")
      }
    });
    
    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth]);


  const signUp = async (email:string,password:string) =>{
    try{
      await createUserWithEmailAndPassword(auth,email,password)
      navigate("/admin")
    }catch(err){
      console.log(typeof err)
    }
  }
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (error: any) {
      console.log(error);
      setError(error.message); // Passing the error message to setError
    }
  };


  const signInWithGoogle = async () =>{
    try{
      await signInWithPopup(auth,googleProvider)
      navigate("/admin")
    }catch(err){
      console.log(err)
    }
  }
  const signout = async () =>{
    try{
      await signOut(auth)
      navigate("/login")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider value={{user,error,signUp,signInWithGoogle,signout,signIn}}>
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