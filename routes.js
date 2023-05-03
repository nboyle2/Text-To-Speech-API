const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const controllers = require('./controllers');
const{ validate, validateResult } = require('./validator');

const router = express.Router();

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Text-To-Speech API',
            version: '1.0.0',
            description: 'The Text-To-Speech API allows you to get a list of voices and convert text into synthesized speech using Microsoft Azure Cognitive Services.'
        },
        host: '159.223.123.107:3000',
        basePath: '/'
    },
    apis: ['./routes.js']
};
const specs = swaggerJsDoc(options);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 *     components:
 *         schemas:
 *             Voice:
 *                 type: object
 *                 properties:
 *                     Name:
 *                         type: string
 *                     DisplayName:
 *                         type: string
 *                     LocalName:
 *                         type: string
 *                     ShortName:
 *                         type: string
 *                     Gender:
 *                         type: string
 *                     Locale:
 *                         type: string
 *                     LocaleName:
 *                         type: string
 *                     SampleRateHertz:
 *                         type: string
 *                     VoiceType:
 *                         type: string
 *                     Status:
 *                         type: string
 *                     WordsPerMinute:
 *                         type: string
 *             Request:
 *                 type: object
 *                 properties:
 *                     ShortName:
 *                         type: string
 *                     Text:
 *                         type: string
 */

/**
 * @swagger
 * /voices:
 *    get:
 *        summary: Get a list of voices
 *        description: Get a list of voices
 *        responses:
 *             200:
 *                description: OK
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: array
 *                            items:
 *                                $ref: '#components/schemas/Voice'
 *             400:
 *                description: Bad Request
 *             500:
 *                description: Internal Server Error
 */
router.get('/voices', controllers.voices);

/**
 * @swagger
 * /text-to-speech:
 *    post:
 *        summary: Convert text to speech
 *        description: Convert text to speech
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        $ref: '#components/schemas/Request'
 *        responses:
 *             200:
 *                description: OK
 *                content:
 *                    audio/wav:
 *                        schema:
 *                            type: file
 *             400:
 *                description: Bad Request
 *             500:
 *                description: Internal Server Error
 */
router.post('/text-to-speech', validate, validateResult, controllers.tts);

module.exports = router;