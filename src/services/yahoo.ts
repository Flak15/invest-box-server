import axios from 'axios';
import { IpriceData, IfinancialData } from '../types/index';

const getPriceData = async (s: string): Promise<IpriceData> => {
  try {
    const res = await axios.get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${s}?modules=price%2cfinancialData`);
    const price: number = res.data.quoteSummary.result[0].price.regularMarketPrice.raw;
    const { symbol } = res.data.quoteSummary.result[0].price;
    console.log(symbol);
    const priceData: IpriceData = res.data.quoteSummary.result[0].price;
    const financialData: IfinancialData = res.data.quoteSummary.result[0].financialData;
    return { price, symbol, priceData, financialData };
  } catch (e) {
    console.log(e.message);
    throw new Error(`Error while getting symbol data: ${e.message}`);
  }
};

export default getPriceData;