import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "../lib/firebase";
import { DASHBOARD, LOGIN } from "../lib/routes";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import isUsernameAvailable from "../utils/isUsernameAvailable";

export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      console.log(docSnap.data());
      setLoading(false);
    }
    if (!authLoading) {
      if (authUser) getUser(); //signed in
      else setLoading(false); //not signed in
    }
  }, [authLoading]);

  return { user, isLoading, error };
}

export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = DASHBOARD }) {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Logged In",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "Log In Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return false; //return false if login failed
    }
    setLoading(false);
    return true; //return true if login succeeded
  }
  return { login, isLoading };
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);
    const usernameExists = await isUsernameAvailable(username);

    if (!usernameExists) {
      toast({
        title: "Username Exists",
        description: "Please choose another username.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          email: email.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });
        toast({
          title: "Account created",
          description: "You have successfully registered.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });

        navigate(redirectTo);
      } catch (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading };
}

export function useLogout() {
  const [signOut, isLoading, error] = useSignOut(auth);
  const navigate = useNavigate();
  const toast = useToast();

  async function logout() {
    if (await signOut()) {
      toast({
        title: "Logged Out",
        description: "You have successfully logged out.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      navigate(LOGIN);
    } // else: show error [signOut() returns false if failed]
    else {
      toast({
        title: "Log Out Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }
  return { logout, isLoading };
}

export function useEditProfile() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function editProfile({ username, uid, redirectTo = DASHBOARD }) {
    setLoading(true);
    const usernameExists = await isUsernameAvailable(username);

    if (!usernameExists) { //check if username exists before continuing
      toast({
        title: "Username Exists",
        description: "Please choose another username.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false); //setloading false and show toast if username exists
    } else {
      try {
        await updateDoc(doc(db, "users", uid), { //update doc instead of 'setDoc' so it only updates the fields and doesn't delete the rest
          username: username.toLowerCase(),
        });
        toast({
          title: "Profile Updated",
          description: "You have successfully updated your profile.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        navigate(redirectTo); // navigate to dashboard on success
      } catch (error) {
        toast({
          title: "Update Failed",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      } finally {
        setLoading(false);
      }
    }
  }
  return { editProfile, isLoading };
}
