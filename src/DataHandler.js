/**
 * DataHandler.js
 */

import firebase from "firebase/app"
import "firebase/firestore"
import { db, FIREBASE_DB_CONFIG } from './index.js';

/**
 * This class is responsible for handling data input and output.
 */
class DataHandler {
    /**
     * Initializes a firebase db instance
     */
    initializeDatabase(){ 
        var fbApp = firebase.initializeApp(FIREBASE_DB_CONFIG);
        var db = fbApp.firestore();
    }

    /**
     * Gets the firestore instance
     */
    get() {
        return this.db;
    }

    /**
     * Gets a collection from the db
     */
    GetLocationCollection(){
        // return this.fs.collection('Waterstore').get();
    }

    GetMarkerList(){
        var markerList = ""
        const req = this.db.collection('waterstore').get();
        const tempLocs = req.docs.map((doc)=>({...doc.data(), id: doc.id}));
      
        for(let i = 0; i < tempLocs.length; i++) {
          // Determine the correct icon for the marker
          var totalpts = tempLocs[i].totalpoints;
          var totalreviews = tempLocs[i].totalreviews;
          totalpts = totalpts / totalreviews; // average rating
  
          var icoType = "goodWater"; // TODO: Change default to 'neutral / grey-water'
  
          // Calculate the rating based on conditionals
          if(totalpts = 0 || totalpts == 2.5)
            icoType = "goodWater";
          else if(totalpts < 2.5)
            icoType = "badWater";
          else if(totalpts > 2.5)
            icoType = "goodWater";
  
            console.log( "<MarkerF position={{ lat: " + tempLocs[i].lat + ", lng: " +  tempLocs[i].long + "}} icon={" + icoType + "}/>\n");
  
          // Add the marker to the list
          markerList += "<MarkerF position={{ lat: " + tempLocs[i].lat + ", lng: " +  tempLocs[i].long + "}} icon={" + icoType + "}/>\n";
        }

        return markerList;
    }
}

var dh = new DataHandler();

export { dh };