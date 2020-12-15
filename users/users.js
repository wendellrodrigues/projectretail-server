const admin           = require('firebase-admin');
const serviceAccount  = require('../FirebaseAccountKeys.json')


//Initialize firebase app with credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

//DB variable to represent firestore (for searching and updating)
const db = admin.firestore()

module.exports = { 

  returnState: () => {
    console.log(currentUser)
  },

  /**
   *  Gets User Object using ID
   *
   * @param   id        id of user to be searched (from firestore)
   * @return            user object
   * */
  getUserWithId: async(userId) => {
    return new Promise(async (resolve, reject) => {
      await db.collection('users').get().then((snapshot) => {
        snapshot.forEach(doc => {
          if(doc.id == userId) {
            const userData = doc.data()
            resolve(userData) 
          }         
        });
      })
    })
  },



    /**
   *  Gets Shelf Object using ID, major, minor
   *
   * @param   id        id of shelf to be searched (from firestore)
   * @param   major     major valueof shelf to be searched (from firestore)
   * @param   minor     minor value of shelf to be searched (from firestore)
   * @return            shelf object
   * */
  getShelf: async(beaconId, major, minor) => {
    return new Promise(async (resolve, reject) => {
      await db.collection('beacons')
        .where('UUID', '==', beaconId)
        .where('major', '==', major)
        .where('minor', '==', minor)
        .get().then(
          (snapshot) => {
            if(snapshot.empty) {
              reject()
            }
            snapshot.forEach(doc => {
              const shelf = doc.data()
              resolve(shelf)
            })         
          })
    })
  },



  /**
    @param {String}   beaconId    The id of the beacon to search for
    @param {Int}      major       The major of the beacon to search for
    @param {Int}      minor       The minor of the beacon to search for
    @param {Object}   userObject  The user object to add to nearbyUsers
   */
  addUserToShelf: async(beaconId, major, minor, userObject) => {

    return new Promise(async(resolve, reject) => {

      var beaconDB_id = ''
      var beaconRef

      //Get Beacon reference object (to update) and the id
      await db.collection('beacons')
        .where('UUID', '==', beaconId)
        .where('major', '==', major)
        .where('minor', '==', minor)
        .get().then(
          (snapshot) => {
            if(snapshot.empty) {
                reject()
            }
            snapshot.forEach(doc => {
              beaconRef = doc.data()
              beaconDB_id = doc.id
            }) 
          }
        )

      //If no beacon was found with fields, reject
      if(beaconDB_id == '') reject()

      //Check to see if user is already near a shelf. If so, reject
      const nearbyUsers = beaconRef.nearbyUsers

      let foundUser = false

      for(nearbyUser of nearbyUsers) {
        if(nearbyUser.id == userObject.id) {
          foundUser = true
        } 
      }

      //If no user found, add a nearby user
      if(foundUser == false) {
        console.log('Adding user')
        await db.collection('beacons').doc(beaconDB_id).update({
          nearbyUsers: admin.firestore.FieldValue.arrayUnion(userObject)
        });
      }

      resolve()
    });
  },


  /**
    @param {String}   beaconId    The id of the beacon to search for
    @param {Int}      major       The major of the beacon to search for
    @param {Int}      minor       The minor of the beacon to search for
    @param {Object}   userObject  The user object to remove from nearbyUsers
   */
  removeUserFromShelf: async(beaconId, major, minor, userObject) => {

    return new Promise(async(resolve, reject) => {

      var beaconDB_id = ''
      var beaconRef

      //Get Beacon reference object (to update) and the id
      await db.collection('beacons')
        .where('UUID', '==', beaconId)
        .where('major', '==', major)
        .where('minor', '==', minor)
        .get().then(
          (snapshot) => {
            if(snapshot.empty) {
                reject()
            }
            snapshot.forEach(doc => {
              beaconRef = doc.data()
              beaconDB_id = doc.id
            }) 
          }
        )

      //If no beacon was found with fields, reject
      if(beaconDB_id == '') reject()

      //Check to see if user exists on the shelf. If so, remove user
      const nearbyUsers = beaconRef.nearbyUsers

      let foundUser = false

      for(nearbyUser of nearbyUsers) {
        if(nearbyUser.id == userObject.id) {
          foundUser = true
        } 
      }

      //If user found, remove user
      if(foundUser == true) {
        console.log('Removing')
        await db.collection('beacons').doc(beaconDB_id).update({
          nearbyUsers: admin.firestore.FieldValue.arrayUnion(userObject)
        });
      }

      resolve()
    });
  },


}