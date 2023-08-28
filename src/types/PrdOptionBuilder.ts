import type PrdAttr from "./PrdAttr";
import type PrdAttrBuilder from "./PrdAttrBuilder";
import PrdOption from "./PrdOption";

export default class PrdOptionBuilder {
  option: PrdOption;

  constructor(title: string) {
    this.option = new PrdOption();
    this.option.title = title;
  }

  translatedtitle(title: string): PrdOptionBuilder {
    this.option.translatedTitle = title;
    return this;
  }

  attributes(attrbuilder: PrdAttrBuilder[]): PrdOptionBuilder {
    const attributes: PrdAttr[] = [];
    attrbuilder.forEach((builder) => {
      attributes.push(builder.build());
    });
    this.option.attributes = attributes;
    return this;
  }

  addAttributes(attrbuilder: PrdAttrBuilder[]): PrdOptionBuilder {
    const attributes: PrdAttr[] = [];
    attrbuilder.forEach((builder) => {
      attributes.push(builder.build());
    });
    this.option.attributes = this.option.attributes.concat(attributes);
    return this;
  }

  build(): PrdOption {
    return this.option;
  }
}
