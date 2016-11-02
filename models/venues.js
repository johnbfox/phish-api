var venues = require('../datalayer/venues')

exports.getCount = function(req, resp, next){
  count = venues.getCount();
  resp.send({
    data:{
      'count': count
    }
  });
}
