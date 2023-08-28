import * as ff from "@google-cloud/functions-framework";
import { PrdInfo, PrdInfoBuilder } from "sazoshop";
import { GmarketParser } from "./parser/GmarketParser";

ff.http("gmarket_parser", async (req: ff.Request, res: ff.Response) => {
  //
  const url = req.body.url;
  const builder: PrdInfoBuilder = await new GmarketParser().parse(url);
  const prdInfo = builder.build();

  res.send({ json: prdInfo.toJSON() });
});
