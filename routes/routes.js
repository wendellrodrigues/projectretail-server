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


router
  .route('/getNearbyUsers')
  .post(
    helpers.getNearbyUsers
  )

/**
 * Adds a user to a list of nearby users on a Firestore beacon object
 * @route   /routes/addUser
 */
router 
.route('/addUser')
  .post(
    helpers.addUserData
  )

/**
 * Removes a user from a list of nearby users on a Firestore beacon object
 * @route   /routes/removeUser
 */
router
.route('/removeUser')
  .post(
    helpers.removeUserData
  )

router
  .route('/getUser')
    .post(
      helpers.getUser
    )




module.exports = router;