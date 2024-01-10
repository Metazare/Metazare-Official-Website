// Firebase
import { useEffect, useState } from "react";
import {auth, googleProvider} from "../../Config/Firebase";
import { createUserWithEmailAndPassword,signInWithPopup ,signOut,signInWithCredential,onAuthStateChanged} from 'firebase/auth';

function useFirebaseAuth() {
  const [user,setUser] = useState<object|null>({})
  
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const signUp = async (email:string,password:string) =>{
    try{
      await createUserWithEmailAndPassword(auth,email,password)
    }catch(err){
      console.log(err)
    }finally{
      window.location.href = '/admin';
    }
  }

  const signInWithGoogle = async () =>{
    try{
      await signInWithPopup(auth,googleProvider)
    }catch(err){
      console.log(err)
    }
  }
  const signout = async () =>{
    try{
      await signOut(auth)
    }catch(err){
      console.log(err)
    }
  }
  return {user,auth,signInWithGoogle,signUp,signout}
}

export default useFirebaseAuth