import axios from 'axios';
import { IpriceData, IsummaryDetail } from '../types/index';

const getPriceData = async (s: string): Promise<IpriceData> => {
  try {
    const res = await axios.get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${s}?modules=price`);
    const price: number = res.data.quoteSummary.result[0].price.regularMarketPrice.raw;
    const { shortName, currency, exchangeName, symbol }: IpriceData = res.data.quoteSummary.result[0].price;
    return { price, currency, shortName, exchangeName, symbol };
  } catch (e) {
    console.log(e.message);
    throw new Error(`Error while getting symbol price: ${e.message}`);
  }
};

export const getFinanceData = async (s: string): Promise<IsummaryDetail> => {
  try {
    const res = await axios.get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${s}?modules=summaryDetail`);
    const summaryDetail: IsummaryDetail = res.data.quoteSummary.result[0].summaryDetail;
    return summaryDetail;
  } catch (e) {
    console.log(e.message);
    throw new Error(`Error while getting symbol summary data: ${e.message}`);
  }
};

export default getPriceData;