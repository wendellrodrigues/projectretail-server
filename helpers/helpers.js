const admin           = require('firebase-admin');
const serviceAccount  = require('../FirebaseAccountKeys.json')
const users           = require('../users/users')


module.exports = { 

  /**
   * Sends a test message
   * @param   req   The request
   * @param   res   The response
   * 
   */
  sendTestMsg: async(req, res) => {
    res.json({name: "Wen"})
  },

  /**
   * Gets user data
   * @param   req   The request. Includes id
   * @param   res   The response
   * 
   */
  getUserData: async(req, res) => {

    //First clear user
    users.clearUserFromDevice()
    
    const userId = req.body.id
 
    users.getUserWithId(userId)

    res.status(200).send()

  },

  clearUserData: async(req, res) => {
    users.clearUserFromDevice()
    
    res.status(200).send()
  }


}