const express = require('express')
const { findAll, create, findOne, update, deleteOne } = require('../controller/trending')



const router = express.Router();

router.route('/').get(findAll).post(create);
router.route('/:id').get(findOne).put(update).delete(deleteOne);


module.exports = router;