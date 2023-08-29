"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PrdAttr_1 = __importDefault(require("./PrdAttr"));
class PrdOption {
    constructor() {
        this.title = "";
        this.attributes = [];
    }
    /**
     * O(n * m) ~= O(m) n: 상위 옵션 개수, m: attribute 개수
     * @returns  선택가능한 옵션 출력
     */
    selectableAttributes() {
        return this.attributes.filter((attr) => this.isSelectableAttribute(attr));
    }
    /**
     * 옵션 선택
     * @param id 선택할 attribute의 id
     */
    selectAttribute(id) {
        const attr = this.attributes.find((value) => value.id === id);
        if (attr != null && this.isSelectableAttribute(attr))
            this.selectedAttributeId = attr.id;
        return attr;
    }
    unselectAttribute() {
        this.selectedAttributeId = undefined;
    }
    /**
     * 의존성을 재귀적으로 확인
     * 선행 옵션의 선택된 attribute가 의존성에 포함되어있는지를 확인
     * O(n) ~= O(1) n: 의존성 배열의 길이(=선행 옵션의 개수)
     * @param attr 선택가능한 옵션인지 확인할 attribute
     * @returns
     */
    isSelectableAttribute(attr) {
        if (this.prevOption === undefined || attr.dependency === undefined)
            return true;
        let prev = this.prevOption; // 선행 옵션
        let i = attr.dependency.length - 1; // 의존성 배열의 마지막 인덱스
        while (prev !== undefined && i >= 0) {
            if (attr.dependency[i] !== prev.selectedAttributeId)
                return false;
            prev = prev.prevOption;
            i -= 1;
        }
        return true;
    }
    /**
     * @returns 선택된 attribute
     */
    selectedAttribute() {
        if (this.selectedAttributeId === undefined)
            return undefined;
        return this.attributes.find((attr) => attr.id === this.selectedAttributeId);
    }
    toJSON() {
        return Object.assign(Object.assign({}, this), { attributes: this.attributes.map((attr) => attr.toJSON()), prevOption: this.prevOption ? this.prevOption.toJSON() : undefined });
    }
    static fromJSON(data) {
        const prdOption = Object.assign(new PrdOption(), data);
        prdOption.attributes = data.attributes.map(PrdAttr_1.default.fromJSON);
        prdOption.prevOption = Object.assign(new PrdOption(), data.prevOption);
        return prdOption;
    }
}
exports.default = PrdOption;
