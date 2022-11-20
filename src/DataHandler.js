/**
 * DataHandler.js
 */

import firebase from "firebase/compat/app"
import "firebase/firestore"

/**
 * This class is responsible for handling data input and output.
 */
class DataHandler {
    /**
     * Initializes a firebase db instance
     */
    initializeDatabase(){ 
        var fbApp = firebase.initializeApp(process.env.FIREBASE_DB_CONFIG);
        var fs = fbApp.getFirestore();
    }

    /**
     * Gets the firestore instance
     */
    get() {
        return this.fs;
    }

    /**
     * Gets a collection from the db
     */
    GetLocationCollection(){
        // return this.fs.collection('Waterstore').get();
    }   
}
