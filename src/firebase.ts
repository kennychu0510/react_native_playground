// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
//@ts-ignore
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId, databaseURL } from '@env';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
  databaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Database = getDatabase(app);
export const Auth = getAuth(app);
