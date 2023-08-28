// * If the project does not need to use firebase, delete this file.
import * as admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: 'AIzaSyAPS7Gy-k3M9cupopSSd6omYEGyBrbNtGw',
  authDomain: 'sazokr.firebaseapp.com',
  projectId: 'sazokr',
  storageBucket: 'sazokr.appspot.com',
  messagingSenderId: '920363921915',
  appId: '1:920363921915:web:6c0c78396471656a3d9b5e',
};

// Initialize Firebase
export const adminApp = admin.initializeApp(firebaseConfig);
export const DB = adminApp.firestore();
