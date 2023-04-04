import React from "react";

const firebaseError = (error) => {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return(`Email address already in use.`);
            break;
        case 'auth/invalid-email':
            return(`Email address  is invalid.`);
            break;
        case 'auth/operation-not-allowed':
            return(`Error during sign up.`);
            break;
        case 'auth/weak-password':
            return('Password is not strong enough. Add additional characters including special characters and numbers.');
            break;
        default:
            return("There was an unsupported response from server.");
            break;
    }
};

export default firebaseError;
