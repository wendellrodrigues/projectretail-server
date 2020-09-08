const express   = require('express');
const router    = express.Router();
const helpers   = require('../helpers/helpers');




/**
 * Sends a test message
 * @route   /routes/test
 */
router
  .route('/test')
  .get(
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


router
  .route('/clearUser')
  .post(
    helpers.clearUserData
  );







module.exports = router;