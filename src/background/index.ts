import getPrice from '../services/yahoo.js';
import Instrument from '../models/Instrument.js';
import config from 'config';

const updatePrices = async () => {
	const instruments = await Instrument.getAllInstruments();
	const symbols = instruments.map(instrument => instrument.symbol)
	await Promise.all(
		symbols.map(async (symbol) => {
			const newPriceData = await getPrice(symbol);
			await Instrument.updateInstrument({ symbol, price: newPriceData.price });
		})
	);
	setTimeout(() => {
		updatePrices();
	}, config.get('updateTime'));
};

export default () => {
	setTimeout(() => {
		updatePrices();
		console.log('tick');
	  }, config.get('updateTime'));
}

