import _ from 'lodash';
import Calc from './Calc';

export default class Infrastructure {
  constructor(params) {
    const {
      boardColumns,
      board,
      boardRows,
      aiMark,
      opponentMark,
      aiLevel,
      refs
    } = params;

    /** @type {string[][]} */
    this.board = board || _.range(boardColumns).map(i => []);
    /** @type {number} */
    this.maxHeight = boardRows;
    /** @type {string} */
    this.mark = aiMark;
    /** @type {string} */
    this.opponentMark = opponentMark;
    /** @type {number} */
    this.aiLevel = aiLevel;

    if (refs) {
      Object.assign(this, refs);
    } else {
      const series = Calc.formSeries(this.board.length, this.maxHeight);

      const basicCounter = { [this.mark]: 0, [this.opponentMark]: 0 };
      const markCountersBySeries = new Map(
        series.map(series => [
          series,
          Object.assign(
            {},
            basicCounter,
            _.countBy(series, c => this.board[c.x][c.y])
          )
        ])
      );

      this.series = series.map(series => markCountersBySeries.get(series));

      this.seriesByCell = _.range(4)
        .map(i => _.groupBy(series, series => Calc.stringifyCell(series[i])))
        .map(group =>
          _.fromPairs(
            _.toPairs(group).map(([key, seriesArr]) => [
              key,
              seriesArr.map(series => markCountersBySeries.get(series))
            ])
          )
        )
        .reduce((unitedMapByCell, currMapByCell) => {
          Object.keys(currMapByCell).forEach(key => {
            if (key in unitedMapByCell) {
              unitedMapByCell[key].push(...currMapByCell[key]);
            } else {
              unitedMapByCell[key] = currMapByCell[key];
            }
          });
          return unitedMapByCell;
        }, {});
    }

    this.factor = n => n ** this.board.length * this.series.length * 4;
  }

  /** @param {number} col */
  appendToColumn(col, mark) {
    this.board[col].push(mark);
    this.lastColumn = col;
    this.seriesByCell[Calc.getLastCellAsString(this.board, col)].forEach(
      counterByMark => counterByMark[mark]++
    );
  }

  /** @param {number} col */
  removeFromColumn(col, mark) {
    this.seriesByCell[Calc.getLastCellAsString(this.board, col)].forEach(
      counterByMark => counterByMark[mark]--
    );
    this.board[col].pop();
  }

  isTie() {
    return this.board.every(col => col.length === this.maxHeight);
  }

  won(lastCell) {
    return this.wonByMark(lastCell, this.mark);
  }
  lost(lastCell) {
    return this.wonByMark(lastCell, this.opponentMark);
  }

  wonByMark(lastCell, mark) {
    if (lastCell) {
      return this.seriesByCell[lastCell].some(
        counterByMark => counterByMark[mark] === 4
      );
    } else {
      return this.series.some(counterByMark => counterByMark[mark] === 4);
    }
  }

  wrapFillColumnTemp(i, mark, fn) {
    if (this.board[i].length === this.maxHeight) {
      return 0;
    }
    this.appendToColumn(i, mark);
    const res = fn();
    this.removeFromColumn(i, mark);
    return res;
  }

  toggleMark(mark) {
    return mark === this.mark ? this.opponentMark : this.mark;
  }
}
