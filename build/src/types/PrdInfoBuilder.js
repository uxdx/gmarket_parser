"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrdInfo_1 = __importDefault(require("./PrdInfo"));
class PrdInfoBuilder {
    constructor() {
        this.prd = new PrdInfo_1.default();
    }
    title(title) {
        this.prd.title = title;
        return this;
    }
    sitename(sitename) {
        this.prd.sitename = sitename;
        return this;
    }
    url(url) {
        this.prd.url = url;
        return this;
    }
    originPrice(originPrice) {
        this.prd.originPrice = originPrice;
        return this;
    }
    salePrice(salePrice) {
        this.prd.salePrice = salePrice;
        return this;
    }
    translatedTitle(translatedTitle) {
        this.prd.translatedTitle = translatedTitle;
        return this;
    }
    thumbnailURL(thumbnailURL) {
        this.prd.thumbnailURL = thumbnailURL;
        return this;
    }
    isRocketDelivery(isRocketDelivery) {
        this.prd.isRocketDelivery = isRocketDelivery;
        return this;
    }
    deliveryFee(deliveryFee) {
        this.prd.deliveryFee = deliveryFee;
        return this;
    }
    option(OptionBuilder) {
        const option = OptionBuilder.build();
        // 옵션이 없을 때
        if (this.options.length === 0) {
            this.prd.options.push(option);
            return this;
        }
        // 옵션이 있을 때
        option.prevOption = this.prd.options[this.prd.options.length - 1];
        this.prd.options.push(option);
        return this;
    }
    options(OptionBuilders) {
        OptionBuilders.forEach((builder) => {
            this.option(builder);
        });
        return this;
    }
    optionPriceMap(optionPriceMap) {
        this.prd.optionPriceMap = optionPriceMap;
        return this;
    }
    toJSON() {
        return this.prd.toJSON();
    }
    static fromJSON(data) {
        const builder = new PrdInfoBuilder();
        builder.prd = PrdInfo_1.default.fromJSON(data);
        return builder;
    }
    build() {
        return this.prd;
    }
}
exports.default = PrdInfoBuilder;
