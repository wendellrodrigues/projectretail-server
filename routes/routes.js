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
 * Gets a user object
 * @route   /routes/getUser
 */
router
  .route('/getUser')
    .post(
      helpers.getUser
    )


/**
 * Gets a shelf object
 * @route   /routes/getUser
 */
router
  .route('/getShelf')
    .post(
      helpers.getShelf
    )


router 
  .route('/getShelfWithId')
  .post(
    helpers.getShelfWithId
  )

/**
 * Gets the array of nearby users of a Firestore beacon object
 * @route   /routes/getNearbyUsers
 */
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





module.exports = router;