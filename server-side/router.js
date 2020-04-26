const express = require('express');
const router = express.Router();

// Get request to a root route. And we have typical request and response.
router.get('/', (req, res) => {
    res.send('Server is up and running!!');
});

// We are simply going to export the route and router we have created.
module.exports = router;
