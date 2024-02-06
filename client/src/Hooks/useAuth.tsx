import React, { createContext, useState, useEffect, useContext } from 'react';
import {useNavigate, Outlet, Navigate} from 'react-router-dom';

import {auth, googleProvider} from "../Config/Firebase";
import { createUserWithEmailAndPassword,signInWithRedirect ,signOut,onAuthStateChanged,signInWithEmailAndPassword} from 'firebase/auth';
import useTeam from './Firebase/useTeam';
interface AuthContextState {
  user: any;
  error:any;
  allowed:any;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>(
  {
    user: null,
    error: null,
    allowed:null,
    signUp: async (email: string, password: string) => {},
    signInWithGoogle: async () => {},
    signout: async () => {},
    signIn: async () => {}
  }
)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null);
  const [allowed, setAllowed] = useState(false);
  const [error,setError] = useState<any>(null);
  const {data:team} = useTeam();
  useEffect(() => {
    setError(null)
    const unsubscribe = onAuthStateChanged(auth, async(currentUser) => {
      await setUser(currentUser);
      if(currentUser === null && window.location.href.includes("admin")){
        navigate("/")
      }
    });
    
    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, [auth]);
  useEffect(()=>{
    if(user && team){
      if(checkEmailExists(user.email,team)){
        setAllowed(true)
        console.log(user)
        navigate("/admin")
      }else{
        signout()

        setError("Gmail is not Registered")
        setAllowed(false)
      }
    }
  },[user,team])

  function checkEmailExists(email:string, userList:any) {
    return userList && userList.some((user:any) => {
      return user.hasOwnProperty('gmail') && user.gmail === email;
    });
  }

  const signUp = async (email:string,password:string) =>{
    try{
      await createUserWithEmailAndPassword(auth,email,password)
    }catch(err){
      console.log(err)
    }
  }
  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log(error);
      setError(error.message); // Passing the error message to setError
    }
  };


  const signInWithGoogle = async () =>{
    try{
      await signInWithRedirect(auth,googleProvider)
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
    <AuthContext.Provider value={{user,allowed,error,signUp,signInWithGoogle,signout,signIn}}>
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

export const ProtectedRoute = () => {

  const {user,allowed} = useAuth();

  return (
    user?
      allowed? 
        <Outlet/>        
        :<Navigate to="/error"/>
    :<Navigate to="/login"/>
  );
};