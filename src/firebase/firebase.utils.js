import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAXZEoLxISw8F4CRt60ikrkwc2dD9Ptw28",
  authDomain: "crwn-db-2a4e6.firebaseapp.com",
  databaseURL: "https://crwn-db-2a4e6.firebaseio.com",
  projectId: "crwn-db-2a4e6",
  storageBucket: "crwn-db-2a4e6.appspot.com",
  messagingSenderId: "762598859613",
  appId: "1:762598859613:web:eb7e7b0cf6f7fd9fd9beb4",
  measurementId: "G-1L44PQ68SQ",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
