const axios = require('axios');

const express = require('express');
const app = express();
const port = 3000;

app.get('/regions', (req, res) => {
    res.sendFile(__dirname + '/regions.json');
});

app.listen(port, () => {
    console.log(`Listening at https://localhost:${port}`);
});