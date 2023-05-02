const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 3000;
const host = '159.223.123.107';

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(port, host, () => {
    console.log(`Listening at https://${host}:${port}`);
});