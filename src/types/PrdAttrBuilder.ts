import PrdAttr from "./PrdAttr";

export default class PrdAttrBuilder {
  attr: PrdAttr;

  constructor(id: string) {
    this.attr = new PrdAttr(id);
  }

  name(name: string): PrdAttrBuilder {
    this.attr.name = name;
    return this;
  }

  translatedName(translatedName: string): PrdAttrBuilder {
    this.attr.translatedName = translatedName;
    return this;
  }

  dependency(dependency: string[]): PrdAttrBuilder {
    this.attr.dependency = dependency;
    return this;
  }

  price(price: number): PrdAttrBuilder {
    this.attr.price = price;
    return this;
  }

  imageURL(imageURL: string): PrdAttrBuilder {
    this.attr.imageURL = imageURL;
    return this;
  }

  build(): PrdAttr {
    return this.attr;
  }
}
