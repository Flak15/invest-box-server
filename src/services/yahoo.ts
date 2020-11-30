import axios from 'axios';
import { IpriceData, IsummaryDetail } from '../types/index';

const getPriceData = async (s: string): Promise<IpriceData> => {
  try {
    const res = await axios.get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${s}?modules=price%2cfinancialData`);
    console.log(res.data.quoteSummary.result[0]);
    const price: number = res.data.quoteSummary.result[0].price.regularMarketPrice.raw;
    const { symbol } = res.data.quoteSummary.result[0].price;
    const priceData: IpriceData = res.data.quoteSummary.result[0].price;
    const financialData: IsummaryDetail = res.data.quoteSummary.result[0].financialData;
    return { price, symbol, priceData, financialData };
  } catch (e) {
    console.log(e.message);
    throw new Error(`Error while getting symbol data: ${e.message}`);
  }
};

export default getPriceData;