import PrdOption from "./PrdOption";

export default class PrdInfo {
  title?: string;

  url?: string;

  sitename?: string;

  translatedTitle?: string;

  originPrice?: number; // 할인 안된 가격

  salePrice?: number; // 할인된 가격

  thumbnailURL?: string;

  isRocketDelivery?: boolean;

  deliveryFee?: number;

  options: PrdOption[] = [];

  optionPriceMap?: Map<string, number>; // Key: "속성1:속성2:...:속성n"옵션조합 별 가격

  // importFirestoreData() {}
  // exportFirestoreData() {}

  /**
   * @returns {number} 옵션까지 다 합친 가격
   */
  totalPrice(): number {
    // 가격 맵이 있으면 맵에서 찾아서 반환
    if (this.optionPriceMap != null) {
      const key = "";
      this.options.forEach((opt) => {
        key.concat(opt.selectedAttribute()?.id ?? "");
      });
      return this.optionPriceMap.get(key) ?? 0;
    }
    // 가격 맵이 없으면 옵션 가격을 다 더해서 반환
    let totalPrice = this.salePrice ?? 0;
    this.options.forEach((option) => {
      totalPrice += option.selectedAttribute()?.price ?? 0;
    });
    return totalPrice;
  }

  setTranslatedTitle(value: string): void {
    this.translatedTitle = value;
  }

  toJSON(): any {
    const mapToArray = this.optionPriceMap?.entries() ?? [];
    return {
      ...this,
      options: this.options.map((option) => option.toJSON()),
      optionPriceMap: Array.from(mapToArray),
    };
  }

  static fromJSON(data: any): PrdInfo {
    const prdInfo = Object.assign(new PrdInfo(), data);
    prdInfo.options =
      data.options !== null && data.options !== undefined
        ? data.options.map(PrdOption.fromJSON)
        : [];
    if (data.optionPriceMap !== null && data.optionPriceMap !== undefined)
      prdInfo.optionPriceMap = new Map(JSON.parse(data.optionPriceMap));

    return prdInfo;
  }
}
