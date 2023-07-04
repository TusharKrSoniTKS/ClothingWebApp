import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9uZV-cnIgcZmjBiio0A2UDaEg1FpWxAo",
  authDomain: "crwn-clothing-cfbf0.firebaseapp.com",
  projectId: "crwn-clothing-cfbf0",
  storageBucket: "crwn-clothing-cfbf0.appspot.com",
  messagingSenderId: "708073283163",
  appId: "1:708073283163:web:14686c77cb27ddf5b8297e",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const useDocRef = doc(db, "users", userAuth.uid);

//   console.log(useDocRef);

  const userSnapshot = await getDoc(useDocRef);
//   console.log(userSnapshot);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(useDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return useDocRef;
};
