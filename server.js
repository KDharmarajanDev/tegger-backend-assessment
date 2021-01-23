const express = require('express');
const https = require('https');
const app = express();
const port = 8080;

// This is the main API endpoint for getting crypto values from tokens
app.get('/api/:uid', (req, res) => {
    let user_id = req.params.uid;
    https.get(`https://stg-api.tegger.io/api/v1/interactions/history/${user_id}`, (res) => {
        let data = "";
        res.on("data", new_data => {
            data += new_data;
        });
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});