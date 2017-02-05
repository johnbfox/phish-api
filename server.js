var express = require('express'),
    shows = require('./models/shows'),
    songs = require('./models/songs'),
    songVersions = require('./models/songVersions'),
    venues = require('./models/venues'),
    https = require('https'),
    app = express(),
    pingInterval = 300000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', process.env.PORT || 5000);

app.get('/phish-api/', function(req, res, next){
    res.send('welcome to the phish!');
});

app.get('/phish-api/showStateCount', shows.getShowStateCount);
app.get('/phish-api/showStateCount/:year', shows.getShowStateCount);
app.get('/phish-api/showStateCountCum/:year', shows.getShowStateCum);

app.get('/phish-api/showCityCount', shows.getShowCityCount);

//song version model routes
app.get('/phish-api/songVersionCount', songVersions.getCount);
app.get('/phish-api/songCountsOverYears/:song', songVersions.getSongCountsOverYears);
app.get('/phish-api/songCountsForYear', songVersions.getSongCountsForYear);
app.get('/phish-api/cooccurences/:song', songVersions.getCoOccurences);


app.listen( app.get('port'), function () {
  console.log('Phish api listenting on %d!', app.get('port'));
});
