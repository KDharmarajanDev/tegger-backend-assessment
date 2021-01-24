let expect = require("chai").expect;
let server = require("../server.js");

describe("Converting Tegger Tokens to Cryptos", () => {
    describe("Testing for Accuracy", () => {
        it("Accurate for Props, Bitcoin, and Ethereum", () => {
            let props_per_tgr = 0.0375;
            let props_usd = 0.08014;
            let result = server.convert_tgr_to_crypto(123, props_usd, props_per_tgr, {"data":[{"id":"bitcoin","rank":"1","symbol":"BTC","name":"Bitcoin","supply":"18592068.0000000000000000","maxSupply":"21000000.0000000000000000","marketCapUsd":"593152178729.6360702417926824","volumeUsd24Hr":"10472743298.8262043268544904","priceUsd":"31903.5073844198542218","changePercent24Hr":"-2.5167065914519580","vwap24Hr":"32387.0294738673931100","explorer":"https://blockchain.info/"},{"id":"ethereum","rank":"2","symbol":"ETH","name":"Ethereum","supply":"114135028.6865000000000000","maxSupply":null,"marketCapUsd":"140819853186.8497274986467369","volumeUsd24Hr":"7502343709.2931684110007309","priceUsd":"1233.8004800756319780","changePercent24Hr":"0.5685462437129297","vwap24Hr":"1241.4577322312443888","explorer":"https://etherscan.io/"}],"timestamp":1611449744359});
            expect(result['Props']).to.equal(4.6125);
            expect(result['Bitcoin']).to.equal(0.000011586367152237226);
            expect(result['Ethereum']).to.equal(0.00029959929175691415);
        });
        it("Accurate for Props and Ethereum", () => {
            let props_per_tgr = 0.0375;
            let props_usd = 0.08014;
            let result = server.convert_tgr_to_crypto(123, props_usd, props_per_tgr, {"data":[{"id":"ethereum","rank":"2","symbol":"ETH","name":"Ethereum","supply":"114135028.6865000000000000","maxSupply":null,"marketCapUsd":"140819853186.8497274986467369","volumeUsd24Hr":"7502343709.2931684110007309","priceUsd":"1233.8004800756319780","changePercent24Hr":"0.5685462437129297","vwap24Hr":"1241.4577322312443888","explorer":"https://etherscan.io/"}],"timestamp":1611449744359});
            expect(result['Props']).to.equal(4.6125);
            expect(result['Ethereum']).to.equal(0.00029959929175691415);
        });
    });
    describe("Error Testing", () => {
        it("Data is replaced with contents", () => {
            let props_per_tgr = 0.0375;
            let props_usd = 0.08014;
            let result = server.convert_tgr_to_crypto(123, props_usd, props_per_tgr, {"contents":[{"id":"bitcoin","rank":"1","symbol":"BTC","name":"Bitcoin","supply":"18592068.0000000000000000","maxSupply":"21000000.0000000000000000","marketCapUsd":"593152178729.6360702417926824","volumeUsd24Hr":"10472743298.8262043268544904","priceUsd":"31903.5073844198542218","changePercent24Hr":"-2.5167065914519580","vwap24Hr":"32387.0294738673931100","explorer":"https://blockchain.info/"},{"id":"ethereum","rank":"2","symbol":"ETH","name":"Ethereum","supply":"114135028.6865000000000000","maxSupply":null,"marketCapUsd":"140819853186.8497274986467369","volumeUsd24Hr":"7502343709.2931684110007309","priceUsd":"1233.8004800756319780","changePercent24Hr":"0.5685462437129297","vwap24Hr":"1241.4577322312443888","explorer":"https://etherscan.io/"}],"timestamp":1611449744359});
            expect(Object.keys(result).length).to.equal(0);
        });
        it("Name is replaced with nomen", () => {
            let props_per_tgr = 0.0375;
            let props_usd = 0.08014;
            let result = server.convert_tgr_to_crypto(123, props_usd, props_per_tgr, {"data":[{"id":"ethereum","rank":"2","symbol":"ETH","nomen":"Ethereum","supply":"114135028.6865000000000000","maxSupply":null,"marketCapUsd":"140819853186.8497274986467369","volumeUsd24Hr":"7502343709.2931684110007309","priceUsd":"1233.8004800756319780","changePercent24Hr":"0.5685462437129297","vwap24Hr":"1241.4577322312443888","explorer":"https://etherscan.io/"}],"timestamp":1611449744359});
            expect(result['Props']).to.equal(4.6125);
            expect(Object.keys(result).length).to.equal(1);
        });
        it("priceUsd is renamed to price", () => {
            let props_per_tgr = 0.0375;
            let props_usd = 0.08014;
            let result = server.convert_tgr_to_crypto(123, props_usd, props_per_tgr, {"data":[{"id":"ethereum","rank":"2","symbol":"ETH","name":"Ethereum","supply":"114135028.6865000000000000","maxSupply":null,"marketCapUsd":"140819853186.8497274986467369","volumeUsd24Hr":"7502343709.2931684110007309","price":"1233.8004800756319780","changePercent24Hr":"0.5685462437129297","vwap24Hr":"1241.4577322312443888","explorer":"https://etherscan.io/"}],"timestamp":1611449744359});
            expect(result['Props']).to.equal(4.6125);
            expect(Object.keys(result).length).to.equal(1);
        });
    });
});