const express = require("express")
const router = express.Router();
const fs = require('fs');
const accountRoutes = require('./users.js')

router.use(accountRoutes)
module.exports = router;