// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVdsotAU3n5WGoYa6Bqoyrqg5J4QpGv1s",
  authDomain: "movieapp-45148.firebaseapp.com",
  projectId: "movieapp-45148",
  storageBucket: "movieapp-45148.appspot.com",
  messagingSenderId: "236014517337",
  appId: "1:236014517337:web:1b363108c1aeef11264548",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
