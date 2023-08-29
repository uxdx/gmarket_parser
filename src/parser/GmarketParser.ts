import * as cheerio from "cheerio";
import { PrdAttrBuilder, PrdInfoBuilder, PrdOptionBuilder } from "sazoshop";
import { scrape } from "./Scraper";

type WebData = {
  goods: {
    GoodsName: string;
    ImageUrl: string;
    OriginPrice: number;
  };
  eventObj: {
    itemName: string;
    price: number;
  };
  options: {
    OptionDepth: number;
    CombinationalOptionData1: OptionData;
    CombinationalOptionData2: OptionData | null;
    CombinationalOptionData3: OptionData | null;
  } | null;
};
type OptionData = {
  OptionName: string;
  OptionValues: {
    OptionValue1: string;
    OptionValue2: string | null;
    OptionValue3: string | null;
    OptionPrice: number;
    SellPriceText: string;
  }[];
};

export class GmarketParser {
  async parse(url: string): Promise<PrdInfoBuilder> {
    const html = await scrape(url);
    const data: WebData = this.extractDataAsJson(html);
    const $ = cheerio.load(html);

    const builder = new PrdInfoBuilder();
    builder
      .title(this.title(data))
      .sitename("gmarket")
      .originPrice(this.originPrice(data))
      .salePrice(this.salePrice(data))
      .thumbnailURL(this.thumbnailURL(data))
      .options(this.options(data, $));

    return builder;
  }
  /**
   * Get core data from HTML
   */
  extractDataAsJson(html: string): WebData {
    const sliceString = (
      text: string,
      startString: string,
      endString: string
    ): string => {
      const startIndex = text.indexOf(startString);
      if (startIndex === -1) {
        return "";
      }

      const endIndex = text.indexOf(endString, startIndex + startString.length);
      if (endIndex === -1) {
        return text.substring(startIndex + startString.length);
      }
      return text.substring(startIndex + startString.length, endIndex);
    };

    const goods = JSON.parse(sliceString(html, "var goods = ", ";"));
    const eventObj = JSON.parse(sliceString(html, "var eventObj = ", ";"));
    const options =
      JSON.parse(
        sliceString(
          html,
          "GmktItem.OptionParamCoreAbove.combOptionObj = ",
          "\n"
        )
      ) ?? null;

    return {
      goods,
      eventObj,
      options,
    };
  }

  options(data: WebData, $: cheerio.CheerioAPI): PrdOptionBuilder[] {
    const optionList: PrdOptionBuilder[] = [];
    const { options } = data;

    if (options !== null) {
      // Add first option
      optionList.push(
        new PrdOptionBuilder(
          options.CombinationalOptionData1.OptionName
        ).attributes(
          options.CombinationalOptionData1.OptionValues.map((attr) =>
            new PrdAttrBuilder(attr.OptionValue1).price(attr.OptionPrice)
          )
        )
      );

      // Add second option
      if (options.CombinationalOptionData2 !== null) {
        optionList.push(
          new PrdOptionBuilder(
            options.CombinationalOptionData2.OptionName
          ).attributes(
            options.CombinationalOptionData2.OptionValues.map((attr) =>
              new PrdAttrBuilder(attr.OptionValue2 ?? "none")
                .price(attr.OptionPrice)
                .dependency([attr.OptionValue1])
            )
          )
        );
      }

      // Add third option
      if (options.CombinationalOptionData3 !== null) {
        optionList.push(
          new PrdOptionBuilder(
            options.CombinationalOptionData3.OptionName
          ).attributes(
            options.CombinationalOptionData3.OptionValues.map((attr) =>
              new PrdAttrBuilder(attr.OptionValue3 ?? "none")
                .price(attr.OptionPrice)
                .dependency([attr.OptionValue1, attr.OptionValue2 ?? "none"])
            )
          )
        );
      }
      return optionList;
    }

    const optionDiv = $(".select-item");
    if (optionDiv.length !== 0) {
      const option = optionDiv.first();
      const optionTitle =
        $(option).find("#optOrderSelOptNm_0").val()?.toString() ?? "";
      const attrs: {
        attributeId: string;
        name: string;
        selected: boolean;
        optionPrice: number;
      }[] = [];

      $(option)
        .find(".select-itemoption-list > li > a")
        .each((i, elem) => {
          const elemAttrs = elem.attribs;
          const optionName = elemAttrs["data-optionvalue1"];
          const optionPrice = elemAttrs["data-optionprice"];
          attrs.push({
            attributeId: optionName,
            name: optionName,
            selected: false,
            optionPrice: parseInt(optionPrice, 10),
          });
        });
      optionList.push(
        new PrdOptionBuilder(optionTitle).attributes(
          attrs.map((attr) =>
            new PrdAttrBuilder(attr.attributeId)
              .price(attr.optionPrice)
              .name(attr.name)
          )
        )
      );
    }

    return optionList;
  }

  title(data: WebData): string {
    return data.eventObj.itemName;
  }

  originPrice(data: WebData): number {
    return data.goods.OriginPrice;
  }

  salePrice(data: WebData): number {
    return data.eventObj.price;
  }

  thumbnailURL(data: WebData): string {
    return data.goods.ImageUrl;
  }
}
