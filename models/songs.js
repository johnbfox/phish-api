var shows = require('../datalayer/songs')

exports.getCount = function(req, resp, next){
  count = shows.getCount();
  resp.send({
    data:{
      'count': count
    }
  });
}
