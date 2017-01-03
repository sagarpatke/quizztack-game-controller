module.exports = function(state, {cmd, player}) {
  switch(cmd) {
    case 'sendState':
      return true;
    // TODO: player picks question
    case 'pickQuestion':
      return pickQuestion(state, player);
  }
};

function pickQuestion(state, player) {
  console.log('state:', state);
  console.log('player:', player);
  console.log('!state.currQuestion:', !state.currQuestion && state.cue === player);
  return (
    !state.currQuestion && state.cue === player
  );
}
