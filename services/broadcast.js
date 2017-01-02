const client = require('./getRedisClient');

module.exports = function(gameId, state, msg, callback) {
  client.publish(gameId+'_broadcast', msg, (err) => {
    if(err) { callback(err); return; }
    callback(null, state);
  });
};
