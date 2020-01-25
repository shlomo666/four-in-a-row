import { PlayerTurn } from './enums';
import _ from 'lodash';
import gameVaraiables, { firstMark, secondMark } from './gameVaraiables';

export const setBoard = steps => {
  const { board, engineFirst } = gameVaraiables;

  if (steps) {
    board.forEach((col, i) =>
      [...col].reverse().forEach(mark => engineFirst.removeFromColumn(i, mark))
    );
    steps.forEach((step, i) =>
      engineFirst.appendToColumn(step, i % 2 ? secondMark : firstMark)
    );
  }

  gameVaraiables.currentPlayer =
    steps.length % 2 === 0 ? PlayerTurn.FIRST : PlayerTurn.SECOND;
  lastEngine().lastColumn = _.last(steps);
};

export const isGameOver = () => {
  const currentEngine = getCurrentEngine();

  return currentEngine.lost() || currentEngine.isTie();
};

export const performAIMove = onStep => {
  const currentEngine = getCurrentEngine();

  currentEngine.takeStep();
  gameVaraiables.gameMessage = currentEngine.message;

  onStep(currentEngine.lastColumn);
};

export const isCurrentPlayerType = n => {
  const { currentPlayer, meta } = gameVaraiables;

  return currentPlayer === PlayerTurn.FIRST
    ? meta.first.type === n
    : meta.second.type === n;
};

export const switchPlayer = () => {
  gameVaraiables.currentPlayer = nextPlayer();
};
export const nextPlayer = () => 3 - gameVaraiables.currentPlayer;

export const getCurrentEngine = () => {
  const { currentPlayer, engineFirst, engineSecond } = gameVaraiables;
  return currentPlayer === PlayerTurn.FIRST ? engineFirst : engineSecond;
};

export const lastEngine = () => {
  const { currentPlayer, engineFirst, engineSecond } = gameVaraiables;
  return currentPlayer === PlayerTurn.FIRST ? engineSecond : engineFirst;
};

export const getCurrentMark = () => {
  const { currentPlayer } = gameVaraiables;
  return currentPlayer === PlayerTurn.FIRST ? firstMark : secondMark;
};
