import getPrice from '../services/yahoo.js';
import Instrument from '../models/Instrument.js';

const updatePrices = async () => {
	const instruments = await Instrument.getAllInstruments();
	const symbols = instruments.map(instrument => instrument.symbol)
	console.log(symbols);
	await Promise.all(
		symbols.map(async (symbol) => {
			const newPrice = await getPrice(symbol);
			console.log(newPrice);
			await Instrument.updateInstrument({ symbol, price: newPrice});
		})
	)
};
export default () => {
	setInterval(() => {
		updatePrices();
		console.log('tick');
	  }, 10000);
}

