import getPriceData from '../services/yahoo.js';
import Instrument from '../models/Instrument.js';
import config from 'config';

const updatePrices = async () => {
	try {
		const instruments = await Instrument.getAllInstruments();
		const symbols = instruments.map(instrument => instrument.symbol);
		await Promise.all(
			symbols.map(async (symbol) => {
				try {
					const { price, priceData, financialData, summaryDetail } = await getPriceData(symbol);
					await Instrument.updateInstrument({ symbol, price, priceData, financialData, summaryDetail });
				} catch (e) {
					console.log('Update error: ', e.message);
				}
			})
		);
	} catch (e) {
		console.log('Error while getting symbols: ', e.message);
	}

	// setTimeout(() => {
	// 	updatePrices();
	// }, config.get('updateTime'));
};

export default () => {
	setTimeout(() => {
		updatePrices();
	  }, config.get('updateTime'));
}

