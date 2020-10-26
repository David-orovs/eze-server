import { Router } from 'express';
import * as requestController from '../controllers/requestController';
import setQuery from '../middleware/setQuery';

const router = Router();

router.route('/').get(requestController.getAll).post(requestController.create);
router
  .route('/buy')
  .get(setQuery({ requestType: 'buy' }), requestController.getAll);
router
  .route('/sell')
  .get(setQuery({ requestType: 'sell' }), requestController.getAll);

router.route('/sizes').get(requestController.getAllStorageSizes);
router.route('/prices/minmax').get(requestController.getMinMaxPrices);

export default router;
