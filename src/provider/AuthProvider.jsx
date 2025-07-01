import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState( null);

  const [loading,setloading]=useState(true)

  const createUser = (email, password) => {
    setloading(true)
    return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn=(email,password)=>{
        setloading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logOut=()=>{
        return signOut(auth)
    }
    const googleProvider = new GoogleAuthProvider();

        const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
        };


    useEffect(()=>{
            const unsUbscribe=onAuthStateChanged(auth,(currentUser)=>{
                setUser(currentUser)
                setloading(false)
                

            });
            return ()=>{
                unsUbscribe();
            }
        },[])



  const authData = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    signInWithGoogle,
    loading,
    setloading,
    


  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
