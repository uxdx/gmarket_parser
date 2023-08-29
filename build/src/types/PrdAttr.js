"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrdAttr {
    constructor(id) {
        this.id = id;
    }
    setTranslatedName(value) {
        this.translatedName = value;
    }
    toJSON() {
        return this;
    }
    static fromJSON(data) {
        return Object.assign(new PrdAttr(data.id), data);
    }
}
exports.default = PrdAttr;
