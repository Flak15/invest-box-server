import { promises as fs } from 'fs';
import path from 'path';

const read = async () => {
  const csv = await fs.readFile(path.resolve(process.cwd(), 'ListingSecurityList.csv') , 'utf-8');

  const rows = csv.split('\n');
  const keys = rows[0].split(';');
  const values = rows.slice(1);

  const parsed = keys.reduce((res, key) => {
    return { ...res, [key]: [] };
  }, {});

  values.forEach((row) => {
    row.split(';').forEach((value, i) => {
      parsed[keys[i]].push(value);
    })
  })

  console.log(parsed.s_RTS_code.toString())
  console.log('Total:', parsed.s_RTS_code.length)
}
read();