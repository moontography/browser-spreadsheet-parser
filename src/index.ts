import parseCsv from "./libs/Csv";
import parseXlsx from "./libs/Xlsx";

export default async function parseFile(file: File): Promise<string[][]> {
  const parts = file.name.split(".");
  const extension = parts[parts.length - 1];
  switch (extension) {
    case "xlsx":
      return parseXlsx(await fileToUint8Array(file));
    default:
      // 'csv'
      return await parseCsv(file);
  }
}

async function fileToUint8Array(file: File): Promise<Uint8Array> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = function (_) {
      resolve(new Uint8Array((reader as any).result));
    };
    reader.readAsArrayBuffer(file);
  });
}
