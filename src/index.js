import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDWrpv9hYPMgI4qyZR5RDcL01Ijcu9HCuo",
    authDomain: "codeforces-extension-5ff85.firebaseapp.com",
    databaseURL: "https://codeforces-extension-5ff85-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "codeforces-extension-5ff85",
    storageBucket: "codeforces-extension-5ff85.appspot.com",
    messagingSenderId: "26786845982",
    appId: "1:26786845982:web:1e2c9c11cf4cce56b2650f",
    measurementId: "G-H2C2P4TEXP"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };