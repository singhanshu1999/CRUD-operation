const controller = require('../controller_layer/api');

const express = require('express');

const router = express.Router();


router.get('/details', controller.find);
router.put('/details/:actor_id', controller.update);
router.post('/create',controller.create);
router.delete('/remove/:actor_id',controller.removeactor);

module.exports = router;