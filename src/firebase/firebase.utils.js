import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAEk4a3VhKITnEghZ6QkTInDeaRGF_GoCg",
  authDomain: "boutique-clothing.firebaseapp.com",
  databaseURL: "https://boutique-clothing.firebaseio.com",
  projectId: "boutique-clothing",
  storageBucket: "boutique-clothing.appspot.com",
  messagingSenderId: "796983205791",
  appId: "1:796983205791:web:26757b85cf4b6548bae7aa",
  measurementId: "G-VRZW7EL315"
};

firebase.initializeApp(config);

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
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
