const admin           = require('firebase-admin');
const serviceAccount  = require('../FirebaseAccountKeys.json')
const users           = require('../users/users')


const db = admin.firestore()

module.exports = { 

  /**
   * Sends a test message
   * @param   req   The request
   * @param   res   The response
   * 
   */
  sendTestMsg: async(req, res) => {
    res.json({name: "Test message"})
  },




  /**

    Firestore 'Users' collection holds userobjects
    Return a user object

    req: {
      "userId"    : {String},
    }

    res: {
      "maleWaistSize"                 : {Int},
      "hasEnteredSizingPreferences"   : {String},
      "styles"                        : [String],
      "uid"                           : {String},
      "maleLengthSize"                : {Int},
      "femalePantsSize"               : {String},
      "femaleShirtSize"               : {String},
      "maleShirtSize"                 : {String},
      "firstName"                     : {String},
      "email"                         : {String}
    }
    
  */
  getUser: async(req, res) => {

    console.log("Got GET USER request")

    const userId = req.body.userId

    if(!userId) {
      res.status(400).send()
      return
    }

    const user = await users.getUserWithId(userId)

    res.json(user)

  },



  /**

    Firestore 'Beacons' collection holds beacon objects
    Beacon objects contain an array of nearby users called 'nearbyUsers'

    Find the nearbyUsers of a specific beacon and responds with the array

    req: {
      "beaconId"    : {String},
      "beaconMajor" : {Int},
      "beaconMinor" : {Int}
    }

    res: {
      [
        {
          "id": {String},
          "name": {String}
        },
      ]
    }
    
  */
  getNearbyUsers: async(req, res) => {

    console.log("Got request")

    const beaconId = req.body.beaconId
    const major = req.body.beaconMajor
    const minor = req.body.beaconMinor

    if( !beaconId ||
        !major ||
        !minor) {
          res.status(400).send()
          return
        }

    const nearbyUsers = await users.getNearbyUsersFromShelf(beaconId, major, minor)

    res.json(nearbyUsers)

  },
 

  /**

    Firestore 'Beacons' collection holds beacon objects
    Beacon objects contain an array of nearby users called 'nearbyUsers'

    Adds the user's id and the user's first name to nearbyUsers for a specific beacon

    req: {
      "userId"      : {String},
      "beaconId"    : {String},
      "beaconMajor" : {Int},
      "beaconMinor" : {Int}
    }
    
  */
  addUserData: async(req, res) => {

    //User ID
    const userId = req.body.userId

    //Id of the beacon attempting to connect to
    const beaconId = req.body.beaconId

    //Major and minor
    const beaconMajor = req.body.beaconMajor
    const beaconMinor = req.body.beaconMinor

    //If request sent without fields, return 400
    if( !userId ||
        !beaconId ||
        !beaconMajor ||
        !beaconMinor)
      { 
        res.status(400).send() 
      }

    //Get user object
    let user = await users.getUserWithId(userId)
    //Make sure that user obj exists
    if(!user) res.status(400).send()

    //Get Beacon object
    let shelf = await users.getShelf(beaconId, beaconMajor, beaconMinor)
    //Make sure that beacon/shelf obj exists
    if(!shelf) res.status(400).send()

    //Create user object to update shelf with
    const userObj = {
      id: user.uid,
      name: user.firstName
    }

    //Update shelf with a user object (add user object)
    await users.addUserToShelf(beaconId, beaconMajor, beaconMinor, userObj)
      .then(() => {
        res.status(200).send()
      })
  },

  /**

    Firestore 'Beacons' collection holds beacon objects
    Beacon objects contain an array of nearby users called 'nearbyUsers'

    Removes the user's id and the user's first name from nearbyUsers for a specific beacon

    req: {
      "userId"      : {String},
      "beaconId"    : {String},
      "beaconMajor" : {Int},
      "beaconMinor" : {Int}
    }
    
  */
  removeUserData: async(req, res) => {

    //User ID
    const userId = req.body.userId

    //Id of the beacon attempting to connect to
    const beaconId = req.body.beaconId

    //Major and minor
    const beaconMajor = req.body.beaconMajor
    const beaconMinor = req.body.beaconMinor
  
    //If request sent without fields, return 400
    if( !userId ||
        !beaconId ||
        !beaconMajor ||
        !beaconMinor)
      { 
        res.status(400).send() 
      }

    //Get user object
    let user = await users.getUserWithId(userId)
    //Make sure that user obj exists
    if(!user) res.status(400).send()

    //Get Beacon object
    let shelf = await users.getShelf(beaconId, beaconMajor, beaconMinor)
    //Make sure that beacon/shelf obj exists
    if(!shelf) res.status(400).send()

    //Create user object to update shelf with
    const userObj = {
      id: user.uid,
      name: user.firstName
    }

    //Update shelf with a user object (remove user object)
    await users.removeUserFromShelf(beaconId, beaconMajor, beaconMinor, userObj)
      .then(() => {
        res.status(200).send()
      })

    res.status(200).send()

  },

}