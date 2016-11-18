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

app.get('/', function(req, res, next){
    res.send('welcome to the phish!');
});

app.get('/showStateCount', shows.getShowStateCount);
app.get('/showStateCount/:year', shows.getShowStateCount);
app.get('/showStateCountCum/:year', shows.getShowStateCum);

app.get('/showCityCount', shows.getShowCityCount);

//song version model routes
app.get('/songVersionCount', songVersions.getCount);
app.get('/songCountsOverYears/:song', songVersions.getSongCountsOverYears);
app.get('/songCountsForYear', songVersions.getSongCountsForYear);
app.get('/cooccurences/:song', songVersions.getCoOccurences);


app.listen( app.get('port'), function () {
  console.log('Phish api listenting on %d!', app.get('port'));
});

//Keeping heroku app awake
setInterval(function(){
  https.get('https://phish-api.herokuapp.com/');
}, 300000)
