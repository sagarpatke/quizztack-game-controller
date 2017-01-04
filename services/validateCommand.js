module.exports = function(state, {cmd, player}) {
  switch(cmd) {
    case 'sendState':
      return true;
    // TODO: player picks question
    case 'pickQuestion':
      return pickQuestion(state, player);
    //player hits the buzzer
    case 'hitBuzzer':
      return hitBuzzer(state);
    //player answers
    case 'answer':
      return answer(state, player);
  }
};

function pickQuestion(state, player) {
  console.log('validation Picks Question');
  // console.log('!state.currQuestion:', !state.currQuestion && state.cue === player);
  return (
    !state.currQuestion && state.cue === player
  );
}
//current Question exists and no one has cue
function hitBuzzer(state){
  console.log('Enter validation hit buzzer');
  // console.log('state.currQuestion:', state.currQuestion.opened && !state.cue);
  return (
    state.currQuestion.opened && !state.cue
  );
}
//current Question exists and player has cue
function answer(state, player){
  console.log('Enter Validation Answer');
  return (
    state.currQuestion.opened && state.cue === player
  );
}
