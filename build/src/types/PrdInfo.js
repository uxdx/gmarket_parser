"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrdOption_1 = __importDefault(require("./PrdOption"));
class PrdInfo {
    constructor() {
        this.options = [];
    }
    // importFirestoreData() {}
    // exportFirestoreData() {}
    /**
     * @returns {number} 옵션까지 다 합친 가격
     */
    totalPrice() {
        var _a, _b;
        // 가격 맵이 있으면 맵에서 찾아서 반환
        if (this.optionPriceMap != null) {
            const key = "";
            this.options.forEach((opt) => {
                var _a, _b;
                key.concat((_b = (_a = opt.selectedAttribute()) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : "");
            });
            return (_a = this.optionPriceMap.get(key)) !== null && _a !== void 0 ? _a : 0;
        }
        // 가격 맵이 없으면 옵션 가격을 다 더해서 반환
        let totalPrice = (_b = this.salePrice) !== null && _b !== void 0 ? _b : 0;
        this.options.forEach((option) => {
            var _a, _b;
            totalPrice += (_b = (_a = option.selectedAttribute()) === null || _a === void 0 ? void 0 : _a.price) !== null && _b !== void 0 ? _b : 0;
        });
        return totalPrice;
    }
    setTranslatedTitle(value) {
        this.translatedTitle = value;
    }
    toJSON() {
        var _a, _b;
        const mapToArray = (_b = (_a = this.optionPriceMap) === null || _a === void 0 ? void 0 : _a.entries()) !== null && _b !== void 0 ? _b : [];
        return Object.assign(Object.assign({}, this), { options: this.options.map((option) => option.toJSON()), optionPriceMap: Array.from(mapToArray) });
    }
    static fromJSON(data) {
        const prdInfo = Object.assign(new PrdInfo(), data);
        prdInfo.options =
            data.options !== null && data.options !== undefined
                ? data.options.map(PrdOption_1.default.fromJSON)
                : [];
        if (data.optionPriceMap !== null && data.optionPriceMap !== undefined)
            prdInfo.optionPriceMap = new Map(JSON.parse(data.optionPriceMap));
        return prdInfo;
    }
}
exports.default = PrdInfo;
