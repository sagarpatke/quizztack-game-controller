const client = require('./services/getRedisClient');

const retrieveState = require('./services/retrieveState');
const validateCommand = require('./services/validateCommand');
const updateData = require('./services/updateData');
const broadcast = require('./services/broadcast');
const saveState = require('./services/saveState');

getMessage();

function getMessage() {
  client.brpop('gameMgrWorkQueue', 0, (err, msgString) => {
    const msg = JSON.parse(msgString[1]);
    processMessage(msg, (err) => {
      if(err) { console.log('ERR:', err); }
      getMessage();
    });
  });
}

function processMessage(msg) {
  async.waterfall([
    // TODO: Retrieve State
    retrieveState.bind(null, msg.gameId),
    // TODO: Validate command
    (state, callback) => {
      if(err) { handleError(err); return; }
      if(!validateCommand(state, msg)) { callback(new Error('Validation Failed')); return; }
      callback(null, state);
    },
    // TODO: Update Data
    updateData.bind(null, msg),
    // TODO: Broadcast
    broadcast.bind(null, msg.gameId),
    // TODO: Publish to Redis
    saveState.bind(null, msg.gameId),
  ], (err, results) => {
    if(err) { handleError(err); return; }
  });
}

function handleError(err) {
  console.error('ERR:',err);
}