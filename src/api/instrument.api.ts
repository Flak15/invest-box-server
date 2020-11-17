import Router from 'express';
import Instrument from '../models/Instrument.js';
import getPriceData from '../services/yahoo.js';

const router = Router();

router.post('/add', async (req, res) => {
  const symbol: string = req.body.symbol;
  try {
    const priceData = await getPriceData(symbol);
    await Instrument.addInstrument(priceData);
    res.json({ message: 'instrument added', symbol });
  }
  catch (e) {
    res.json({ message: e.message });
  }
});


export default router;