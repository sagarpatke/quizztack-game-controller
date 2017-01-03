const client = require('./getRedisClient');

module.exports = function(gameId, state, callback) {
  client.publish(gameId+'_broadcast', JSON.stringify(state), (err) => {
    if(err) { callback(err); return; }
    callback(null, state);
  });
};
