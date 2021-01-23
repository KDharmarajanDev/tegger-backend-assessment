const express = require('express');
const app = express();
const port = 8080;

// This is the main API endpoint for getting crypto values from tokens
app.get('/api/:uid', (req, res) => {
    let user_id = req.params.uid;
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});