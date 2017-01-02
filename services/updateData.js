
/*
 * The second argument of the callback must always be updated state.
 * The third argument of the callback is what will be sent back to the player over socket.
 */
module.exports = function({player, cmd, args}, state, callback) {
  switch(cmd) {
    case 'sendState':
      callback(null, state, state);
      return;
    case 'playerPicksQuestion':
      playerPicksQuestion(args, state, callback);
      return;
    case 'playerHitsBuzzer':
      playerHitsBuzzer(args, state, callback);
      return;
    case 'playerAnswersQuestion':
      playerAnswersQuestion(args, state, callback);
  }
};

function playerPicksQuestion(args, state, callback) {
  // TODO: Mark Picked Question as opened
  const question = state.questions[args.row, args.col];
  question.opened = true;

  // TODO: Clear Cue
  state.cue = false;

  // TODO: Set Current Question
  state.currQuestion = question;

  // TODO: Send playerPicksQuestion to client
  callback(null, state, {
    cmd: 'pickQuestion',
    args: {
      row: args.row,
      col: args.col,
      cue: state.cue
    }
  });
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
