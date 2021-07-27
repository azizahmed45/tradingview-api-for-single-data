//imports
import { TradingViewAPI } from "tradingview-scraper";
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const express = require('express');
const app = express();


//port for server run
const port = 3000;

const tv = new TradingViewAPI();


//change as you need the data
const tinker = 'GBPUSD';
const digitsToDiaplay = 7;


//server endpoint
const endpoint = '/';


//server code
app.get(endpoint, async (req, res) => {

  let data = await tv.getTicker(tinker);

  //format data
  let price = data.lp;
  price = price.toFixed(digitsToDiaplay);
  price = price.toString();
  price = price.substring(0, digitsToDiaplay);

  //json response send
  res.json({
    number: price
  });
});


//error handling
process.on('uncaughtException', function (err) {
  console.log(`Error: ${err}`);
});


//server starts
app.listen(port, () => {
  console.log(`Server is started at http://localhost:${port}`)
});