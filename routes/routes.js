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


  


  module.exports = router;