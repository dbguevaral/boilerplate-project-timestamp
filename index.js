// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const moment = require('moment');
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:date?', (req, res) => {
  let date = req.params.date;
  
  if(!date){
    date = new Date();
    let momento = moment(date)
    res.json({unix: momento.valueOf(), utc: momento.utc().format('ddd, DD MMM YYYY HH:mm:ss [GMT]')})
    return;
  }
  
  if(!isNaN(date)){
    let momento = moment(parseInt(date))
    res.json({unix: parseInt(date), utc: momento.utc().format('ddd, DD MMM YYYY HH:mm:ss [GMT]')})
    return;
  }
  
  if(moment(date).isValid()){
    let momento = moment(date)
    res.json({unix: momento.valueOf(), utc: momento.utc().format('ddd, DD MMM YYYY HH:mm:ss [GMT]')})
    return;
  }
  
  else{
    res.json({error: "Invalid Date"})
    return;
  }
})