import PrdInfo from "./PrdInfo";
import type PrdOptionBuilder from "./PrdOptionBuilder";

export default class PrdInfoBuilder {
  prd: PrdInfo;

  constructor() {
    this.prd = new PrdInfo();
  }

  title(title: string): PrdInfoBuilder {
    this.prd.title = title;
    return this;
  }

  sitename(sitename: string): PrdInfoBuilder {
    this.prd.sitename = sitename;
    return this;
  }

  url(url: string): PrdInfoBuilder {
    this.prd.url = url;
    return this;
  }

  originPrice(originPrice: number): PrdInfoBuilder {
    this.prd.originPrice = originPrice;
    return this;
  }

  salePrice(salePrice: number): PrdInfoBuilder {
    this.prd.salePrice = salePrice;
    return this;
  }

  translatedTitle(translatedTitle: string): PrdInfoBuilder {
    this.prd.translatedTitle = translatedTitle;
    return this;
  }

  thumbnailURL(thumbnailURL: string): PrdInfoBuilder {
    this.prd.thumbnailURL = thumbnailURL;
    return this;
  }

  isRocketDelivery(isRocketDelivery: boolean): PrdInfoBuilder {
    this.prd.isRocketDelivery = isRocketDelivery;
    return this;
  }

  deliveryFee(deliveryFee: number): PrdInfoBuilder {
    this.prd.deliveryFee = deliveryFee;
    return this;
  }

  option(OptionBuilder: PrdOptionBuilder): PrdInfoBuilder {
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

  options(OptionBuilders: PrdOptionBuilder[]): PrdInfoBuilder {
    OptionBuilders.forEach((builder) => {
      this.option(builder);
    });
    return this;
  }

  optionPriceMap(optionPriceMap: Map<string, number>): PrdInfoBuilder {
    this.prd.optionPriceMap = optionPriceMap;
    return this;
  }

  toJSON(): any {
    return this.prd.toJSON();
  }

  static fromJSON(data: any): PrdInfoBuilder {
    const builder = new PrdInfoBuilder();
    builder.prd = PrdInfo.fromJSON(data);
    return builder;
  }

  build(): PrdInfo {
    return this.prd;
  }
}
