const express = require('express');
const {createCuratedList, updateCuratedList} = require('../controllers/curatedLists');
const router = express.Router();

// route for curated list
router.post('/curated-lists', createCuratedList);

// route for update curated lis
router.put('/curated-lists/:curatedListId', updateCuratedList)

module.exports = router;