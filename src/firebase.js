import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";

// Web config is public by design: access is controlled by firestore.rules.
const firebaseConfig = {
  apiKey: "AIzaSyBtG0i-m-AdC7gkQjqmL8CcMBr-bqwV35k",
  authDomain: "random-team-764ad.firebaseapp.com",
  projectId: "random-team-764ad",
  storageBucket: "random-team-764ad.firebasestorage.app",
  messagingSenderId: "356584103647",
  appId: "1:356584103647:web:d6d926c6a834380646936a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Persistent cache: edits made offline are queued and sent when back online.
export const db = initializeFirestore(app, {
  ignoreUndefinedProperties: true,
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});
