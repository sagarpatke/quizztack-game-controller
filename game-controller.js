const client = require('./services/getRedisClient');
const async = require('async');

const retrieveState = require('./services/retrieveState');
const validateCommand = require('./services/validateCommand');
const updateData = require('./services/updateData');
const broadcast = require('./services/broadcast');
const saveState = require('./services/saveState');

getMessage();

function getMessage() {
  console.log('Waiting for Message');
  client.brpop('gameMgrWorkQueue', 0, (err, msgString) => {
    console.log('Received Message:', msgString[1]);
    const msg = JSON.parse(msgString[1]);
    processMessage(msg, (err) => {
      if(err) { handleError(err); }
      setTimeout(getMessage);
    });
  });
}

function processMessage(msg, callback) {
  console.log('Processing Message:', msg);
  async.waterfall([
    retrieveState.bind(null, msg.gameId),
    (state, callback1) => {
      if(!validateCommand(state, msg)) { callback1(new Error('Validation Failed')); return; }
      callback1(null, state);
    },
    // TODO: Update Data
    updateData.bind(null, msg),
    // TODO: Broadcast
    broadcast.bind(null, msg.gameId),
    // TODO: Publish to Redis
    saveState.bind(null, msg.gameId),
  ], (err, results) => {
    if(err) { handleError(err); return; }
    callback(null);
  });
}

function handleError(err) {
  console.error('ERR:',err);
}