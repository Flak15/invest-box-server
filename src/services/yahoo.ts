import axios from 'axios';

interface priceData {
  price: number,
  currency: string,
  shortName: string,
  exchangeName: string,
  symbol: string
}

const getPriceData = async (s: string): Promise<priceData> => {
  try {
    const res = await axios.get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${s}?modules=price`);
    const price: number = res.data.quoteSummary.result[0].price.regularMarketPrice.raw;
    const { shortName, currency, exchangeName, symbol } = res.data.quoteSummary.result[0].price;
    return { price, currency, shortName, exchangeName, symbol };
  } catch (e) {
    console.log(e.message);
    throw new Error(`Error while getting symbol price: ${e.message}`);
  }
};

export default getPriceData;