import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth"
import { firebaseMeasurementId,firebaseAppId,firebaseMessagingSenderId,firebaseStorageBucket,firebaseProjectId, firebaseAuthDomain,firebaseApiKey } from "../_helpers/constants"
import { getFirestore } from "firebase/firestore"

export const firebaseConfig={
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMeasurementId,
}

const app = initializeApp(firebaseConfig)

// const analytics = getAnalytics(app); // check if this is required or not

export const auth=getAuth(app)
export const db=getFirestore(app)
export const persistedAuth = setPersistence(auth, browserSessionPersistence)
export const provider = new GoogleAuthProvider()
export default app;