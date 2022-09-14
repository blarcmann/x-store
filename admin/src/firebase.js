import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCZR70Bu735hSXh8Gvt4276CzqzK2vWN0o",
    authDomain: "bd-select.firebaseapp.com",
    projectId: "bd-select",
    storageBucket: "bd-select.appspot.com",
    messagingSenderId: "842235123793",
    appId: "1:842235123793:web:1d0e0e72adeccc0bfec070"
};

const app = initializeApp(firebaseConfig);

export { app }
