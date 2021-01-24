const express = require('express');
const https = require('https');
const app = express();
const port = 8080;

// This is the main API endpoint for getting crypto values from tokens
app.get('/api/:uid', (req, outer_res) => {
    let user_id = req.params.uid;
    https.get(`https://stg-api.tegger.io/api/v1/interactions/history/${user_id}`, (res) => {
        let data = '';
        res.on('data', new_data => {
            data += new_data;
        });
        res.on("end", () => {
            let json_data = JSON.parse(data);
            let user_tokens = sum_tokens(json_data);
            let props_per_tgr = 0.0375;
            let props_usd = 0.08014;
            https.get('https://api.coincap.io/v2/assets?ids=bitcoin,ethereum', (res) => {
                let crypto_value = '';
                res.on('data', new_crypto_data => {
                    crypto_value += new_crypto_data;
                });
                res.on('end', () => {
                    let json_crypto_value = JSON.parse(crypto_value);
                    outer_res.json(convert_tgr_to_crypto(user_tokens, props_usd, props_per_tgr, json_crypto_value));
                });
            })
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

// This function converts TGR tokens to various cryptocurrencies based on reference crypto (TGR)
function convert_tgr_to_crypto(tgr_amount, reference_crypto_to_usd, reference_crypto_to_tgr, bitcoin_values) {
    let crypto_values = {};
    if ('data' in bitcoin_values) {
        let data = bitcoin_values['data'];
        let usd = tgr_amount * reference_crypto_to_tgr * reference_crypto_to_usd;
        crypto_values['Props'] = usd / reference_crypto_to_usd;
        for (let i = 0; i < data.length; i++) {
            let crypto = data[i];
            if ('name' in crypto && 'priceUsd' in crypto) {
                crypto_values[crypto['name']] = usd / parseFloat(crypto['priceUsd']);
            }
        }
    }
    return crypto_values;
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

exports.sum_tokens = sum_tokens;
exports.convert_tgr_to_crypto = convert_tgr_to_crypto;
exports.app = app;