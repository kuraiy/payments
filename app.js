const stripe = require('./stripe');

const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());


app.use('/api/', stripe);

app.get('/', (req, res) => {
    res.send('Hello dalbabeby');
});

app.listen(port, () => {
    console.log(`App listening at localhost:${port}`);
});

