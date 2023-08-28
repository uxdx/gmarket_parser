import * as ff from "@google-cloud/functions-framework";

ff.http("hello", (req: ff.Request, res: ff.Response) => {
  res.send("OK");
});
