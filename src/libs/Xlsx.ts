import { read, utils, WorkBook, WorkSheet } from "xlsx";

interface IStringMap {
  [key: string]: any;
}

export default function parseXlsx(data: Uint8Array): string[][] {
  const workbook: WorkBook = read(data, { type: "array" });
  return Object.values(parseWorkbook(workbook))[0];
}

function parseWorkbook(workbook: WorkBook): IStringMap {
  return workbook.SheetNames.reduce((obj: IStringMap, sheetName: string) => {
    const worksheet: WorkSheet = workbook.Sheets[sheetName];
    obj[sheetName] = parseWorksheet(worksheet);
    return obj;
  }, {});
}

function parseWorksheet(worksheet: WorkSheet): string[][] {
  const jsonWorksheet: IStringMap[] = utils.sheet_to_json(worksheet, {
    raw: false,
  });
  const keys = Object.keys(jsonWorksheet[0]);
  return jsonWorksheet.reduce((ary: string[][], row: IStringMap, i: number) => {
    if (i === 0) ary.push(keys);
    ary.push(keys.map((k) => row[k]));
    return ary;
  }, []);
}
