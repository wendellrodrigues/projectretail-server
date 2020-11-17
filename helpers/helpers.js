const admin           = require('firebase-admin');
const serviceAccount  = require('../FirebaseAccountKeys.json')
const users           = require('../users/users')
const currentUser     = require('../users/currentUser')

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
   * Gets user data
   * @param   req   The request. Includes id
   * @param   res   The response
   * 
   */
  getUserData: async(req, res) => {

    //If state is not null (beacon in use) return error
    if(currentUser.user !== null) {
      res.status(200).send()
    }

    //First clear user
    users.clearUserFromDevice()

    const userId = req.body.id
 
    users.getUserWithId(userId)

    console.log(currentUser)

    res.status(200).send()

    //Send data to arduino 

  },

  clearUserData: async(req, res) => {
    users.clearUserFromDevice()
    console.log(currentUser)
    res.status(200).send()
  },


  sendUserData: async(req, res) => {

    if(currentUser.user == null) {
      res.status(200).send(null)
    }

    console.log(currentUser)

    res.status(200).send(currentUser)

  }

}