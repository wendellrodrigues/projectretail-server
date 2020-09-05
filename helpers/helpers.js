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
  },
}