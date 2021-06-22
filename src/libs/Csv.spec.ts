import assert from "assert";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import parseCsv from "./Csv";

describe("Csv", function () {
  describe("parseCsv", function () {
    it("should parse a CSV file", async function () {
      const fileStream: Readable = fs.createReadStream(
        path.join(__dirname, "..", "..", "tests", "test.csv"),
        "utf-8"
      );
      const [[header1], [the], [_, text]] = await parseCsv(fileStream);
      assert.strictEqual("header1", header1);
      assert.strictEqual("the", the);
      assert.strictEqual("text", text);
    });
  });
});
