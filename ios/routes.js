const express = require('express');
const generateToken = require('./auth');

const router = express.Router();

generateToken();

router.post('/device-token', (req, res) => {
  console.log(TAG, req.body);
  res.send('ok');
});


module.exports = router;
