import getAllStocksCode from './services/convertQuotes.js';
import Instrument from './models/Instrument.js';

const initDb = async () => {
  const stockSymbols: string[] = await getAllStocksCode();


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