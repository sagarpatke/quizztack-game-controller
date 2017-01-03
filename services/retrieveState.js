const client = require('./getRedisClient');
const async = require('async');

module.exports = function(gameId, callback) {
  async.parallel([
    getQuestions.bind(null, gameId),
    getScores.bind(null, gameId),
    getCurrQuestion.bind(null, gameId),
    getCue.bind(null, gameId)
  ], (err, results) => {
    if(err) { callback(err); return }
    console.log('questions---------------------:' + results[0]);
    const state = {
      questions: results[0],
      scores: results[1],
      currQuestion: results[2],
      cue: results[3]
    };

    callback(null, state);
  });
};

function getQuestions(gameId, callback) {
  client.get(gameId+'_questions', (err, reply) => {
    if(err) { callback(err); return; }

    const questions = (reply ? JSON.parse(reply) : null);

    // const questions2d = [[],[],[],[],[]];

    /*questions.forEach((item, index) => {
      questions2d[index / 6].push(item);
    });*/

    callback(null, questions);
  });
}

function getScores(gameId, callback) {
  client.get(gameId+'_scores', (err, reply) => {
    if(err) { callback(err); return; }
    callback(null, JSON.parse(reply));
  });
}

function getCurrQuestion(gameId, callback) {
  client.get(gameId+'_currQuestion', (err, reply) => {
    if(err) { callback(err); return; }
    callback(null, JSON.parse(reply));
  });
}

function getCue(gameId, callback) {
  client.get(gameId+'_cue', (err, reply) => {
    if(err) { callback(err); return; }
    callback(null, JSON.parse(reply));
  });
}