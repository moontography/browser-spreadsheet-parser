import assert from "assert";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import parseXlsx from "./Xlsx";

describe("Xlsx", function () {
  describe("parseXlsx", function () {
    it("should parse a CSV file", async function () {
      const fileStream: Buffer = await fs.promises.readFile(
        path.join(__dirname, "..", "..", "tests", "test.xlsx"),
        null
      );
      const [[header1], [the], [_, text]] = parseXlsx(
        toArrayBuffer(fileStream)
      );
      assert.strictEqual("header1", header1);
      assert.strictEqual("the", the);
      assert.strictEqual("text", text);
    });
  });
});

function toArrayBuffer(buf: Buffer): Uint8Array {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return view;
}
