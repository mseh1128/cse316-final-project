import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDqCl4sbninY98Fs_MhuZs_Nj00xHAY3SA',
  authDomain: 'final-project-42ed1.firebaseapp.com',
  databaseURL: 'https://final-project-42ed1.firebaseio.com',
  projectId: 'final-project-42ed1',
  storageBucket: 'final-project-42ed1.appspot.com',
  messagingSenderId: '910640568310',
  appId: '1:910640568310:web:5f652f400e32671e6e19d7'
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;
