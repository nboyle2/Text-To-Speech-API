const express = require('express');
const app = express();
const port = 3000;

const axios = require('axios');
const config = {
    headers: {
        'Ocp-Apim-Subscription-Key': ''
    }
};

app.get('/voices', (req, res) => {
    axios.get('https://eastus.tts.speech.microsoft.com/cognitiveservices/voices/list', config)
    .then(response => {
        res.send(response.data);
    })
    .catch(err => {
        console.log(err);
    });
});

app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`);
});