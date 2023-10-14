import { Router } from 'express';
import { createDetails, getAllDetails, deleteDetails, getSingleDetail } from '../controllers/detailsController.js';

const router = Router();

router.route('/details').get(getAllDetails);
router.route('/details/new').post(createDetails);
router.route('/details/:id').get(getSingleDetail);
router.route('/details/:id').delete(deleteDetails);

export default router;
