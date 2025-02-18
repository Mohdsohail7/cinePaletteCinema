const express = require('express');
const {createCuratedList, updateCuratedList, movieAddToCuratedList} = require('../controllers/curatedLists');
const router = express.Router();

// route for curated list
router.post('/curated-lists', createCuratedList);

// route for update curated lis
router.put('/curated-lists/:curatedListId', updateCuratedList)

// route for movie add to curated list
router.post("/movies/curated-list", movieAddToCuratedList);

module.exports = router;