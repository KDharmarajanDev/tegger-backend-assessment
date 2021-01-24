let expect = require("chai").expect;
let server = require("../server.js");

describe("Summing Tokens from Sample Data", () => {
    describe("Testing for Accuracy", () => {
        it("Accurate for all 0 entries", () => {
            let test_input = {"error":false,"status":200,"body":{"interactions":[{"date":{"year":2020,"month":11,"day":17},"tokens":0},{"date":{"year":2020,"month":10,"day":30},"tokens":0},{"date":{"year":2020,"month":10,"day":29},"tokens":0}]}}
            let result = server.sum_tokens(test_input);
            expect(result).to.equal(0);
        });
        it("Accurate for one non-zero entry with array size of 5", () => {
            let test_input = {"error":false,"status":200,"body":{"interactions":[{"date":{"year":2027,"month":11,"day":17},"tokens":0},{"date":{"year":2040,"month":10,"day":30},"tokens":0},{"date":{"year":2020,"month":10,"day":29},"tokens":0},{"date":{"year":2020,"month":11,"day":17},"tokens":0},{"date":{"year":2030,"month":11,"day":17},"tokens":21.1}]}}
            let result = server.sum_tokens(test_input);
            expect(result).to.equal(21.1);
        });
        it("Accurate for all non-zero entries", () => {
            let test_input = {"error":false,"status":200,"body":{"interactions":[{"date":{"year":2020,"month":11,"day":25},"tokens":3.370138888248563},{"date":{"year":2020,"month":11,"day":20},"tokens":9.744097220370845},{"date":{"year":2020,"month":11,"day":19},"tokens":1.8315972218742191},{"date":{"year":2020,"month":11,"day":17},"tokens":5.243749999003688},{"date":{"year":2020,"month":10,"day":30},"tokens":0.833333333175},{"date":{"year":2020,"month":10,"day":29},"tokens":1.1111111109},{"date":{"year":2020,"month":10,"day":28},"tokens":1.77777777744},{"date":{"year":2020,"month":10,"day":27},"tokens":2.388888888435},{"date":{"year":2020,"month":10,"day":19},"tokens":2.388888888435},{"date":{"year":2020,"month":10,"day":17},"tokens":0.388888888815},{"date":{"year":2020,"month":10,"day":16},"tokens":0.7222222220850001},{"date":{"year":2020,"month":10,"day":14},"tokens":10.44444444246},{"date":{"year":2020,"month":10,"day":8},"tokens":4.388888888055},{"date":{"year":2020,"month":10,"day":5},"tokens":4.388888888055},{"date":{"year":2020,"month":10,"day":3},"tokens":5.88888888777},{"date":{"year":2020,"month":10,"day":2},"tokens":2.33333333289}]}}
            let result = server.sum_tokens(test_input);
            expect(result).to.equal(57.24513887801232);
        });
    });
    describe("Error Testing", () => {
        it("body element is renamed to be contents", () => {
            let test_input = {"error":false,"status":200,"contents":{"interactions":[{"date":{"year":2020,"month":11,"day":17},"tokens":0},{"date":{"year":2020,"month":10,"day":30},"tokens":0},{"date":{"year":2020,"month":10,"day":29},"tokens":0}]}}
            let result = server.sum_tokens(test_input);
            expect(result).to.equal(0);
        });
        it("interactions is renamed to information", () => {
            let test_input = {"error":false,"status":200,"body":{"information":[{"date":{"year":2027,"month":11,"day":17},"tokens":0},{"date":{"year":2040,"month":10,"day":30},"tokens":0},{"date":{"year":2020,"month":10,"day":29},"tokens":0},{"date":{"year":2020,"month":11,"day":17},"tokens":0},{"date":{"year":2030,"month":11,"day":17},"tokens":21.1}]}}
            let result = server.sum_tokens(test_input);
            expect(result).to.equal(0);
        });
        it("One of the tokens is renamed to token", () => {
            let test_input = {"error":false,"status":200,"body":{"interactions":[{"date":{"year":2020,"month":11,"day":25},"token":3.370138888248563},{"date":{"year":2020,"month":11,"day":20},"tokens":9.744097220370845},{"date":{"year":2020,"month":11,"day":19},"tokens":1.8315972218742191},{"date":{"year":2020,"month":11,"day":17},"tokens":5.243749999003688},{"date":{"year":2020,"month":10,"day":30},"tokens":0.833333333175},{"date":{"year":2020,"month":10,"day":29},"tokens":1.1111111109},{"date":{"year":2020,"month":10,"day":28},"tokens":1.77777777744},{"date":{"year":2020,"month":10,"day":27},"tokens":2.388888888435},{"date":{"year":2020,"month":10,"day":19},"tokens":2.388888888435},{"date":{"year":2020,"month":10,"day":17},"tokens":0.388888888815},{"date":{"year":2020,"month":10,"day":16},"tokens":0.7222222220850001},{"date":{"year":2020,"month":10,"day":14},"tokens":10.44444444246},{"date":{"year":2020,"month":10,"day":8},"tokens":4.388888888055},{"date":{"year":2020,"month":10,"day":5},"tokens":4.388888888055},{"date":{"year":2020,"month":10,"day":3},"tokens":5.88888888777},{"date":{"year":2020,"month":10,"day":2},"tokens":2.33333333289}]}}
            let result = server.sum_tokens(test_input);
            expect(result).to.equal(53.87499998976375);
        });
    });
});