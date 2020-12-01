import getAllStocksCode from './services/convertQuotes.js';
import Instrument from './models/Instrument.js';
import _ from 'lodash';

const initDb = async () => {
  const stockSymbols: string[] = await getAllStocksCode();

  const alreadyInBaseInstruments = await Instrument.getAllInstruments();
  const missingSymbols = stockSymbols.filter()
  stockSymbols.forEach(async (stockSymbol) => {
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