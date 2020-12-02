import axios from 'axios';
import { IpriceData, IfinancialData, IsummaryDetail } from '../types/index';

interface IyahooRes {
  price: number,
  symbol: string,
  priceData: IpriceData,
  financialData: IfinancialData,
  summaryDetail: IsummaryDetail
}

const getPriceData = async (s: string): Promise<IyahooRes> => {
  try {
    const res = await axios.get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${s}?modules=price%2cfinancialData%2csummaryDetail`);
    const price: number = res.data.quoteSummary.result[0].price.regularMarketPrice.raw;
    const { symbol } = res.data.quoteSummary.result[0].price;
    console.log(symbol);
    const priceData: IpriceData = res.data.quoteSummary.result[0].price;
    const financialData: IfinancialData = res.data.quoteSummary.result[0].financialData;
    const summaryDetail: any = res.data.quoteSummary.result[0].summaryDetail;
    return { price, symbol, priceData, financialData, summaryDetail };
  } catch (e) {
    console.log(e.message);
    throw new Error(`Error while getting symbol data: ${e.message}`);
  }
};

export default getPriceData;