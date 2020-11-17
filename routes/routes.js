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
 * Gets the user information and updates the current user
 * @route   /routes/getUser
 */
router
  .route('/getUser')
  .post(
    helpers.getUserData
  );


/**
 * Clears the current user   
 * @route   /routes/clearUser
 */
router
  .route('/clearUser')
  .post(
    helpers.clearUserData
  );


/**
 * Sends the current user to the store client on request  
 * @route   /routes/sendUser
 */
router
  .route('/sendUser')
    .post(
      helpers.sendUserData
    )



module.exports = router;