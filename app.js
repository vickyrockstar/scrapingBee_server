const express = require('express')
const app = express()
const scrapingbee = require('scrapingbee');
const cors = require('cors');

app.use(cors());
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})
app.get('/', function (req, res) {
const queryLink = req.query.link;
console.log(queryLink);

async function get(url) {
  var client = new scrapingbee.ScrapingBeeClient('GGQMJ3QLL5E8WJ72HZ2PZTXH6KXA5WN3BQHK2H05KIOZ7YEFWF2ZAQIF6XKD4R78QTUYRK29I2WOFVZF');
  var response = await client.get({
    url: url,
    params: {  
        'extract_rules': { "content" : "body"},
    },
  })
  return response
}

get(queryLink).then(function (response) {
    var decoder = new TextDecoder();
    var text = decoder.decode(response.data);
    console.log(text);
    res.status(200)
res.json({res: text, url: queryLink})

}).catch((e) => console.log('A problem occurs : ' + e.response.data));

//
})

app.listen( process.env.PORT || 3000) 