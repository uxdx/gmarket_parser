import * as ff from "@google-cloud/functions-framework";
import { GmarketParser } from "./parser/GmarketParser";
import PrdInfoBuilder from "./types/PrdInfoBuilder";

ff.http("gmarket_parser", async (req: ff.Request, res: ff.Response) => {
  //
  const url = req.body.url;
  const builder: PrdInfoBuilder = await new GmarketParser().parse(url);
  const prdInfo = builder.build();

  res.send({ json: prdInfo.toJSON() });
});
