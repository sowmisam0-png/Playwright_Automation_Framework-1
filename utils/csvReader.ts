import * as fs from 'fs';
import * as path from 'path';

export type CsvRow = Record<string, string>;

export function readCsvData(fileName: string): CsvRow[] {
  const filePath = path.resolve(__dirname, '..', 'test-data', fileName);

  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8').trim();
  if (!fileContent) {
    return [];
  }

  const rows = fileContent.split(/\r?\n/).filter(Boolean);
  const headers = rows[0].split(',').map((header) => header.trim());

  return rows.slice(1).map((row) => {
    const values = row.split(',').map((value) => value.trim());
    return headers.reduce<Record<string, string>>((record, header, index) => {
      record[header] = values[index] ?? '';
      return record;
    }, {});
  });
}
