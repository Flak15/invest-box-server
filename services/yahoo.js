import axios from 'axios';

const getPrice = async (symbol) => {
  try {
    const res = await axios.get(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=price`);
    return res.data.quoteSummary.result[0].price.regularMarketPrice.raw;
  } catch (e) {
    console.log(e.message);
    throw new Error(`Error while getting symbol price: ${e.message}`);
  }
};

export default getPrice;