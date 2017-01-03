
/*
 * The second argument of the callback must always be updated state.
 * The third argument of the callback is what will be sent back to the player over socket.
 */
module.exports = function({player, cmd, args}, state, callback) {
  switch(cmd) {
    case 'sendState':
      callback(null, state);
      return;
    case 'pickQuestion':
      pickQuestion(args, state, callback);
      return;
    case 'playerHitsBuzzer':
      playerHitsBuzzer(args, state, callback);
      return;
    case 'playerAnswersQuestion':
      playerAnswersQuestion(args, state, callback);
  }
};

function pickQuestion({row, col}, state, callback) {
  // TODO: Mark Picked Question as opened
  const question = state.questions[col][row];
  question.opened = true;

  // TODO: Clear Cue
  state.cue = false;

  // TODO: Set Current Question
  state.currQuestion = question;

  state.row = row;

  state.col = col;

  // TODO: Send playerPicksQuestion to client
  callback(null, state);
}

function playerHitsBuzzer(args, state, callback) {
  // TODO: Update Cue
  // TODO: Send Options
}

function playerAnswersQuestion(args, state, callback) {
  // TODO: Update Score
  // TODO: Cue
  // TODO: currQues
}
