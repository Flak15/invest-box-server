import getAllStocksCode from './services/convertQuotes.js';
import Instrument from './models/Instrument.js';
import _ from 'lodash';
import { Iinstrument } from './types/index.js';

const initDb = async () => {
  const stockSymbols: string[] = await getAllStocksCode();
  const exitedInstruments: Iinstrument[] = await Instrument.getAllInstruments();
  const exitedSymbols: string[] = exitedInstruments.map((i: Iinstrument) => i.symbol);
  const missingSymbols: string[] = _.differenceWith(stockSymbols, exitedSymbols, (symbol: string, exitedSymbol: string): boolean => symbol === exitedSymbol);
  console.log(missingSymbols);
  missingSymbols.forEach(async (stockSymbol) => {
    try {
      await Instrument.addInstrument({
        symbol: stockSymbol, shortName: '', price: 0, currency: 'USD', exchangeName: '' 
      });
    } catch (e) {
      console.log(e.message)
    }
  });

}

export default initDb;