"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const expect = require('chai').expect;
(0, mocha_1.describe)('Sample Unit Test Title', () => {
    (0, mocha_1.test)('Example of test case', () => {
        (0, mocha_1.it)('should return 2', () => {
            expect(1 + 1).to.equal(2);
        });
    });
});
