import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCMHXcO1RGJOTsvPDyhUku-ooERFVuerNo",
    authDomain: "care-services-calculator.firebaseapp.com",
    projectId: "care-services-calculator",
    storageBucket: "care-services-calculator.appspot.com",
    messagingSenderId: "795357443656",
    appId: "1:795357443656:web:0b1d1c82e5bddcea1dca7d",
    measurementId: "G-420C2WTNHZ"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
}

export const storeState = async (userAuth, additionalData) => {
  console.log('Saving!!!')
  console.log(userAuth.uid)
  if (!userAuth) return;
  const stateStoreRef = firestore.collection('state').doc(additionalData.name)
  try {
    await stateStoreRef.set({
      user: userAuth.uid,
      payload: {...additionalData}
    })
  } catch (error) {
    console.log('error saving state', error.message);
  }
  
}

export const loadState = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const loadStateRef = firestore.collection('state').doc(additionalData.name)
  try {
    return (await loadStateRef.get()).data().payload //payload is the key of firestore document
  } catch (error) {
    console.log('Error getting document', error.message);
  }
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
