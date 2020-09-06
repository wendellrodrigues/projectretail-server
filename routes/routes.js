const express   = require('express');
const router    = express.Router();
const helpers   = require('../helpers/helpers');




/**
 * Sends a test message
 * @route   /routes/test
 */
router
  .route('/test')
  .post(
    helpers.sendTestMsg
  );


 /**
 * Gets the user information 
 * @route   /routes/getUser
 */
router
  .route('/getUser')
  .post(
    helpers.getUserData
  );







module.exports = router;