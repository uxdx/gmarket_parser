"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const GmarketParser_1 = require("../src/parser/GmarketParser");
const expect = require("chai").expect;
(0, mocha_1.describe)("Parser Test", () => {
    (0, mocha_1.test)("Comple test", () => __awaiter(void 0, void 0, void 0, function* () {
        (0, mocha_1.it)("should return PrdInfoBuilder", () => __awaiter(void 0, void 0, void 0, function* () {
            const sample_url = "http://item.gmarket.co.kr/Item?goodscode=2808997839&ver=20230829";
            const builder = yield new GmarketParser_1.GmarketParser().parse(sample_url);
            const prdInfo = builder.build();
        })).timeout(10000);
        // console.log(prdInfo);
    }));
});
