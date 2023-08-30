import { describe, it, test } from "mocha";
import { PrdInfoBuilder } from "sazoshop";
import { GmarketParser } from "../src/parser/GmarketParser";

const expect = require("chai").expect;

describe("Parser Test", () => {
  it("should return PrdInfoBuilder", async () => {
    const sample_url =
      "http://item.gmarket.co.kr/Item?goodscode=2808997839&ver=20230829";
    const builder: PrdInfoBuilder = await new GmarketParser().parse(sample_url);
    const prdInfo = builder.build();
    expect(prdInfo.title).to.equal(
      "15% 13520원 1+1+1 UV 자외선차단 원터치 고급 3단 접이식 장우산 암막 양산 +부치다패드 60매"
    );
  }).timeout(10000);
  // console.log(prdInfo);
});
