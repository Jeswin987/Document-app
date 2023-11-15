import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAD6aNU9v0wne1bbXlKg666hzBiUL4dawM",
  authDomain: "document-app-2e682.firebaseapp.com",
  databaseURL: "https://document-app-2e682-default-rtdb.firebaseio.com",
  projectId: "document-app-2e682",
  storageBucket: "document-app-2e682.appspot.com",
  messagingSenderId: "499084279154",
  appId: "1:499084279154:web:1d7eb9a7753bfaf5b3b1eb",
  measurementId: "G-3F5MS42DDT"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)