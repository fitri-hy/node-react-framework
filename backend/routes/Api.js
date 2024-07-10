const express = require('express');
const router = express.Router();

router.get('/data', (req, res) => {
  res.json({ message: 'Node-React Framework' });
});

module.exports = router;
