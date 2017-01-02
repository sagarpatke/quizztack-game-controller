module.exports = function(state, {cmd, player}) {
  switch(cmd) {
    case 'sendState':
      return true;
    // TODO: player picks question
    case 'playerPicksQuestion':
      return playerPicksQuestion(state, player);
  }
};

function playerPicksQuestion(state, player) {
  return (
    state.currQuestion === 'false' && state.cue === player
  );
}
