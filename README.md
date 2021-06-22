# browser-spreadsheet-parser

Parse spreadsheet files uploaded in the browser into arrays of objects.

## Install

```sh
$ npm install -s browser-spreadsheet-parser
```

## Usage

```ts
import parseFile from 'browser-spreadsheet-parser'

const spreadsheetData: string[][] = await parseFile(file: File)
```
