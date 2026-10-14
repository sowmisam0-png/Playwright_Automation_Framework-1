import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

export type ExcelRow = Record<string, string | number | boolean>;

export function readExcelData(fileName: string): ExcelRow[] {
  const filePath = path.resolve(__dirname, '..', 'test-data', fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Excel file not found: ${filePath}`);
  }

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const workSheet = workbook.Sheets[sheetName];

  return XLSX.utils.sheet_to_json(workSheet, { defval: '' }) as ExcelRow[];
}

export function readDataFile(fileName: string) {
  const filePath = path.resolve(__dirname, '..', 'test-data', fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Data file not found: ${filePath}`);
  }

  const extension = path.extname(fileName).toLowerCase();

  if (extension === '.csv') {
    const rows = fs.readFileSync(filePath, 'utf-8').trim();
    if (!rows) {
      return [];
    }

    const lines = rows.split(/\r?\n/).filter(Boolean);
    const headers = lines[0].split(',').map((header) => header.trim());

    return lines.slice(1).map((line) => {
      const values = line.split(',').map((value) => value.trim());
      return headers.reduce<Record<string, string>>((record, header, index) => {
        record[header] = values[index] ?? '';
        return record;
      }, {});
    });
  }

  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const workSheet = workbook.Sheets[sheetName];

  return XLSX.utils.sheet_to_json(workSheet, { defval: '' });
}
