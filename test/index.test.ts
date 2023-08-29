import { describe, it, test } from "mocha";
import { PrdInfoBuilder } from "sazoshop";
import { GmarketParser } from "../src/parser/GmarketParser";

const expect = require("chai").expect;

describe("Parser Test", () => {
  test("Comple test", async () => {
    it("should return PrdInfoBuilder", async () => {
      const sample_url =
        "http://item.gmarket.co.kr/Item?goodscode=2808997839&ver=20230829";
      const builder: PrdInfoBuilder = await new GmarketParser().parse(
        sample_url
      );
      const prdInfo = builder.build();
    }).timeout(10000);
    // console.log(prdInfo);
  });
});
