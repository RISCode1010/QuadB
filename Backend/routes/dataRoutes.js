const express = require('express');

const {UpdateData,render,} = require('../controllers/dataController')

const router = express.Router();

router.route("/fetchData").get(UpdateData);
router.route("/").get(render);

module.exports = router;