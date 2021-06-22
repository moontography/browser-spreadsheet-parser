import Papa from "papaparse";
import { Readable } from "stream";

interface IStringMap {
  [key: string]: any;
}

async function parseCsvFileAsync(
  file: File | Readable,
  hasHeader: boolean = false
): Promise<IStringMap> {
  // Parse CSV file using browser APIs
  // https://www.papaparse.com/
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: hasHeader,
      worker: typeof process !== "undefined",
      skipEmptyLines: true,
      complete: resolve,
      error: reject,
    });
  });
}

export default async function parseCsv(
  file: File | Readable,
  hasHeader: boolean = false
): Promise<string[][]> {
  const parsed = await parseCsvFileAsync(file, hasHeader);

  const parsedData = parsed.data;
  // const parsedHeaders = parsed.meta.fields;
  return parsedData;
}
