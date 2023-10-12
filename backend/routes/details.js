const express = require('express');
const { createDetails, getAllDetails, deleteDetails, getSingleDetail } = require('../controllers/detailsController');

const router = express.Router();

router.route('/details').get(getAllDetails);
router.route('/details/new').post(createDetails);
router.route('/details/:id').get(getSingleDetail);
router.route('/details/:id').delete(deleteDetails);

module.exports = router;
