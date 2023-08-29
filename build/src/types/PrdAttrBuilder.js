"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrdAttr_1 = __importDefault(require("./PrdAttr"));
class PrdAttrBuilder {
    constructor(id) {
        this.attr = new PrdAttr_1.default(id);
    }
    name(name) {
        this.attr.name = name;
        return this;
    }
    translatedName(translatedName) {
        this.attr.translatedName = translatedName;
        return this;
    }
    dependency(dependency) {
        this.attr.dependency = dependency;
        return this;
    }
    price(price) {
        this.attr.price = price;
        return this;
    }
    imageURL(imageURL) {
        this.attr.imageURL = imageURL;
        return this;
    }
    build() {
        return this.attr;
    }
}
exports.default = PrdAttrBuilder;
