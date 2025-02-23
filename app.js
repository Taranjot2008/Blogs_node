const express = require('express');
const app = express();
const port = 3000;

app.get('/blogs', (req, res) => {
    res.send("Hello world!");
});

app.get('/', (req, res) => {
    res.send('Oops!, page not found (404)')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

