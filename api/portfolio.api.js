import Router from 'express';
import User from '../models/User.js';
import Portfolio from '../models/Portfolio.js';
import Instrument from '../models/Instrument.js';
import getPriceData from '../services/yahoo.js';

const router = Router();

router.post('/update', async (req, res) => {
  const { username, symbol, value } = req.body;
  const user = await User.getUser({ user: username });
  try {
    await Portfolio.updateValue({ userId: user._id, symbol, value });
    res.json({ message: 'Portfolio updated', symbol, value });
  }
  catch (e) {
    res.json({ message: e });
  }
});

router.post('/add', async (req, res) => { // curl -X POST -H "Content-Type: application/json" --data '{"username": "user2", "symbol":"AAPL", "value":1}' localhost:4000/portfolio/add
  const { username, symbol, value } = req.body; // normalize symbol in frontend
  try {
    const instrument = await Instrument.getInstrument({ symbol: symbol.toUpperCase() });
    if (!instrument) {
      const priceData = await getPriceData(symbol);
      await Instrument.addInstrument(priceData);
    }
    const user = await User.getUser({ user: username });
    await Portfolio.addInstument({ userId: user._id, symbol: symbol.toUpperCase(), value });
    res.json({ message: 'instrument added to portfolio', symbol, value });
  }
  catch (e) {
    res.json({ message: e.message });
  }
});

router.post('/remove', async (req, res) => {
  const { username, symbol } = req.body;
  const user = await User.getUser({ user: username });
  try {
    await Portfolio.removeInstrument({ userId: user._id, symbol });
    res.json({ message: 'instrument removed', symbol });
  }
  catch (e) {
    res.json({ message: e });
  }
});

router.get('/:username', async (req, res) => { // curl localhost:4000/portfolio/user2
  const { username } = req.params;
  const user = await User.getUser({ user: username });
  try {
    const portfolio = await Portfolio.getPortfolio({ userId: user._id });
    const portfolioPromise = portfolio.map(async ({ symbol, value }) => {
      const instrument = await Instrument.getInstrument({ symbol });
      return { ...instrument, value, totalValue: value * instrument.price };
    });
    const portfolioWithValue = await Promise.all(portfolioPromise);
    res.json({ p: JSON.stringify(portfolioWithValue) });
  }
  catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
});
export default router;