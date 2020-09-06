const admin           = require('firebase-admin');
const serviceAccount  = require('../FirebaseAccountKeys.json')



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()



module.exports = { 

  /**
   * Sends a test message
   * @param   req   The request
   * @param   res   The response
   * 
   */
  sendTestMsg: async(req, res) => {
    console.log('We have a request from arduino');
    res.json("Works")
    res.json(process.env.FIREBASE.type)
  },

  /**
   * Gets user data
   * @param   req   The request. Includes id
   * @param   res   The response
   * 
   */
  getUserData: async(req, res) => {

    const exampleUser = req.id
    await db.collection('users').get().then((snapshot) => {
      snapshot.forEach(doc => {
        if(doc.id == exampleUser) res.json(doc.data())
      });
    })
  },


}