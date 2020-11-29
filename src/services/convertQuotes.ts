import { promises as fs } from 'fs';
import path from 'path';

const getAllStocksCode = async () => {
  try {
    const csv = await fs.readFile(path.resolve(process.cwd(), 'constituents_csv.csv'), 'utf-8');
    const rows = csv.split('\n');
    const keys = rows[0].split(',');
    const values = rows.slice(1);
    interface parsedData {
      [key: string]: string[]
    }
    const parsed: parsedData = keys.reduce((res, key) => ({ ...res, [key]: [] }), {});
    values.forEach((row) => {
      row.split(',').forEach((value, i) => {
        parsed[keys[i]].push(value);
      });
    });
    return parsed.Symbol.filter(s => s);
  } catch (e) {
    console.log('Error while reading symbols list: ', e);
    return [];
  }

};


export default getAllStocksCode;
