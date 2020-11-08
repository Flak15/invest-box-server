import axios from 'axios';

const app = async () => {
	const res = await axios.get("https://query1.finance.yahoo.com/v10/finance/quoteSummary/RUB=x?modules=price");
	console.log(res.data.quoteSummary.result[0].price);
}

setInterval(() => {
  
}, 5 * 60 * 1000)