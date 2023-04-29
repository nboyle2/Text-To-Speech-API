const express = require('express');
const controllers = require('./controllers');
const{ validate, validateResult } = require('./validator');

const router = express.Router();

router.get('/voices', controllers.voices);
router.post('/text-to-speech', validate, validateResult, controllers.tts);

module.exports = router;