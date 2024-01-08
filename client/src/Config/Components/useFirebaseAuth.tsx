// Firebase
import {auth, googleProvider} from "../Firebase";
import { createUserWithEmailAndPassword,signInWithPopup ,signOut,signInWithCredential} from 'firebase/auth';

function useFirebaseAuth() {
  const signUp = async (email:string,password:string) =>{
    try{
      await createUserWithEmailAndPassword(auth,email,password)
    }catch(err){
      console.log(err)
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
  return {auth,signInWithGoogle,signUp,signout}
}

export default useFirebaseAuth