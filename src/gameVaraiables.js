import Engine from './logic/engine';
import _ from 'lodash';
import { PlayerTurn, PlayerType } from './enums';

export const firstMark = 1;
export const secondMark = 2;

const basicInfo = {
  board: _.range(7).map(i => []),
  boardColumns: 7,
  boardRows: 6
};
const engineFirst = new Engine({
  ...basicInfo,
  opponentMark: secondMark,
  aiMark: firstMark,
  getAILevel: () => gameVars.meta.first.level
});
const engineSecond = new Engine({
  ...basicInfo,
  opponentMark: firstMark,
  aiMark: secondMark,
  getAILevel: () => gameVars.meta.second.level,
  refs: {
    series: engineFirst.series,
    seriesByCell: engineFirst.seriesByCell
  }
});

window.engine = engineSecond;
const height = basicInfo.boardRows;
const board = basicInfo.board;
const width = basicInfo.boardColumns;

const gameMessage = '';

const currentPlayer = PlayerTurn.FIRST;

const gameVars = {
  currentPlayer,
  gameMessage,
  width,
  height,
  board,
  engineFirst,
  engineSecond,
  get meta() {
    return localStorage.meta
      ? JSON.parse(localStorage.meta)
      : {
          first: { type: PlayerType.HUMAN },
          second: { type: PlayerType.AI, level: 7 }
        };
  },
  set meta(meta) {
    localStorage.meta = JSON.stringify(meta);
  }
};
export default gameVars;
