import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// configuration object copied from firebase project settings
const firebaseConfig = {
    apiKey: "AIzaSyAVQl9HL4AdYNA-orCCNPHrdXC42YP8gbs",
    authDomain: "amazn-clone-santhosh.firebaseapp.com",
    projectId: "amazn-clone-santhosh",
    storageBucket: "amazn-clone-santhosh.appspot.com",
    messagingSenderId: "14929816413",
    appId: "1:14929816413:web:1b0321201b6eed6c07d6b4"
};

// Initialize App with the firebase configuration
const app = initializeApp(firebaseConfig);

// Initialize database
// firestore is real time database in firebase
const db = getFirestore(app);

// for Authentication
const auth = getAuth(app);

export { db, auth };