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

router.get('/all', async (_, res) => {
  try {
    const allInstruments = await Instrument.getAllInstruments();
    res.json({ allI: JSON.stringify(allInstruments) });
  }
  catch (e) {
    res.json({ message: e.message });
  }
});


export default router;