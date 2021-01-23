const express = require('express');
const https = require('https');
const app = express();
const port = 8080;

// This is the main API endpoint for getting crypto values from tokens
app.get('/api/:uid', (req, outer_res) => {
    let user_id = req.params.uid;
    https.get(`https://stg-api.tegger.io/api/v1/interactions/history/${user_id}`, (res) => {
        let data = "";
        res.on("data", new_data => {
            data += new_data;
        });
        res.on("end", () => {
            let json_data = JSON.parse(data);
        });
    });
});

// This function sums tokens from the data
function sum_tokens(user_info) {
    let total = 0;
    if ('body' in user_info && 'interactions' in user_info['body']) {
        let interactions = user_info['body']['interactions']
        for (let i = 0; i < interactions.length; i++) {
            if ('tokens' in interactions[i]) {
                total += interactions[i]['tokens'];
            }
        }
    }
    return total;
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});