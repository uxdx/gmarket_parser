"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrdOption_1 = __importDefault(require("./PrdOption"));
class PrdOptionBuilder {
    constructor(title) {
        this.option = new PrdOption_1.default();
        this.option.title = title;
    }
    translatedtitle(title) {
        this.option.translatedTitle = title;
        return this;
    }
    attributes(attrbuilder) {
        const attributes = [];
        attrbuilder.forEach((builder) => {
            attributes.push(builder.build());
        });
        this.option.attributes = attributes;
        return this;
    }
    addAttributes(attrbuilder) {
        const attributes = [];
        attrbuilder.forEach((builder) => {
            attributes.push(builder.build());
        });
        this.option.attributes = this.option.attributes.concat(attributes);
        return this;
    }
    build() {
        return this.option;
    }
}
exports.default = PrdOptionBuilder;
