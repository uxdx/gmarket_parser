"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.GmarketParser = void 0;
const cheerio = __importStar(require("cheerio"));
const sazoshop_1 = require("sazoshop");
const Scraper_1 = require("./Scraper");
class GmarketParser {
    parse(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield (0, Scraper_1.scrape)(url);
            const data = this.extractDataAsJson(html);
            const $ = cheerio.load(html);
            const builder = new sazoshop_1.PrdInfoBuilder();
            builder
                .title(this.title(data))
                .sitename("gmarket")
                .originPrice(this.originPrice(data))
                .salePrice(this.salePrice(data))
                .thumbnailURL(this.thumbnailURL(data))
                .options(this.options(data, $));
            return builder;
        });
    }
    /**
     * Get core data from HTML
     */
    extractDataAsJson(html) {
        var _a;
        const sliceString = (text, startString, endString) => {
            const startIndex = text.indexOf(startString);
            if (startIndex === -1) {
                return "";
            }
            const endIndex = text.indexOf(endString, startIndex + startString.length);
            if (endIndex === -1) {
                return text.substring(startIndex + startString.length);
            }
            return text.substring(startIndex + startString.length, endIndex);
        };
        const goods = JSON.parse(sliceString(html, "var goods = ", ";"));
        const eventObj = JSON.parse(sliceString(html, "var eventObj = ", ";"));
        const options = (_a = JSON.parse(sliceString(html, "GmktItem.OptionParamCoreAbove.combOptionObj = ", "\n"))) !== null && _a !== void 0 ? _a : null;
        return {
            goods,
            eventObj,
            options,
        };
    }
    options(data, $) {
        var _a, _b;
        const optionList = [];
        const { options } = data;
        if (options !== null) {
            // Add first option
            optionList.push(new sazoshop_1.PrdOptionBuilder(options.CombinationalOptionData1.OptionName).attributes(options.CombinationalOptionData1.OptionValues.map((attr) => new sazoshop_1.PrdAttrBuilder(attr.OptionValue1).price(attr.OptionPrice))));
            // Add second option
            if (options.CombinationalOptionData2 !== null) {
                optionList.push(new sazoshop_1.PrdOptionBuilder(options.CombinationalOptionData2.OptionName).attributes(options.CombinationalOptionData2.OptionValues.map((attr) => {
                    var _a;
                    return new sazoshop_1.PrdAttrBuilder((_a = attr.OptionValue2) !== null && _a !== void 0 ? _a : "none")
                        .price(attr.OptionPrice)
                        .dependency([attr.OptionValue1]);
                })));
            }
            // Add third option
            if (options.CombinationalOptionData3 !== null) {
                optionList.push(new sazoshop_1.PrdOptionBuilder(options.CombinationalOptionData3.OptionName).attributes(options.CombinationalOptionData3.OptionValues.map((attr) => {
                    var _a, _b;
                    return new sazoshop_1.PrdAttrBuilder((_a = attr.OptionValue3) !== null && _a !== void 0 ? _a : "none")
                        .price(attr.OptionPrice)
                        .dependency([attr.OptionValue1, (_b = attr.OptionValue2) !== null && _b !== void 0 ? _b : "none"]);
                })));
            }
            return optionList;
        }
        const optionDiv = $(".select-item");
        if (optionDiv.length !== 0) {
            const option = optionDiv.first();
            const optionTitle = (_b = (_a = $(option).find("#optOrderSelOptNm_0").val()) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "";
            const attrs = [];
            $(option)
                .find(".select-itemoption-list > li > a")
                .each((i, elem) => {
                const elemAttrs = elem.attribs;
                const optionName = elemAttrs["data-optionvalue1"];
                const optionPrice = elemAttrs["data-optionprice"];
                attrs.push({
                    attributeId: optionName,
                    name: optionName,
                    selected: false,
                    optionPrice: parseInt(optionPrice, 10),
                });
            });
            optionList.push(new sazoshop_1.PrdOptionBuilder(optionTitle).attributes(attrs.map((attr) => new sazoshop_1.PrdAttrBuilder(attr.attributeId)
                .price(attr.optionPrice)
                .name(attr.name))));
        }
        return optionList;
    }
    title(data) {
        return data.eventObj.itemName;
    }
    originPrice(data) {
        return data.goods.OriginPrice;
    }
    salePrice(data) {
        return data.eventObj.price;
    }
    thumbnailURL(data) {
        return data.goods.ImageUrl;
    }
}
exports.GmarketParser = GmarketParser;
