const admin           = require('firebase-admin');
const serviceAccount  = require('../FirebaseAccountKeys.json')
const currentUser     = require('./currentUser')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

module.exports = { 

  returnState: () => {
    console.log(currentUser)
  },

  /**
   *  Gets User Object using ID to be stored in the current state
   *  User object (from currentState) is projected to iPad every 2 seconds
   *
   * @param   id            id of user to be searched (from firestore)
   * @return  void
   * */
  getUserWithId: async(uid) => {

    const state = this.currentState;
    //console.log(state)

    const userId = uid
    
    //Add iBeacon uid and add it to add it to user collection array of visited beacons
    

    await db.collection('users').get().then((snapshot) => {
      snapshot.forEach(doc => {
        if(doc.id == userId) {
          console.log('found user')
          const userData = doc.data()
          currentUser.user = userData
          console.log(currentUser.user)
        }         
      });
    })
  },


 
   clearUserFromDevice() {
     currentUser.user = null
   }








}