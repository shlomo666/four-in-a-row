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
      getAILevel,
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
    this.getAILevel = getAILevel;

    if (refs) {
      Object.assign(this, refs);
    } else {
      this.stats = { lastColumn: -1 };
      const series = Calc.formSeries(this.board.length, this.maxHeight);

      const markCountersBySeries = new Map(
        series.map(series => [
          series,
          {
            [this.mark]: 0,
            [this.opponentMark]: 0,
            ..._.countBy(series, c => this.board[c.x][c.y])
          }
        ])
      );

      this.series = series.map(series => markCountersBySeries.get(series));

      this.seriesByCell = _.range(4)
        .map(i => _.groupBy(series, series => Calc.stringifyCell(series[i])))
        .map(group =>
          _.mapValues(group, seriesArr =>
            seriesArr.map(series => markCountersBySeries.get(series))
          )
        )
        // _.merge but keep original pointers
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

    this.columnsRange = _.range(this.board.length);
  }

  /** @param {number} col */
  appendToColumn(col, mark) {
    this.board[col].push(mark);
    this.stats.lastColumn = col;
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

  toggleMark(mark) {
    return mark === this.mark ? this.opponentMark : this.mark;
  }

  onFillColumn(i, mark, fn) {
    if (this.isColumnFull(i)) {
      return 0;
    }
    this.appendToColumn(i, mark);
    const res = fn();
    this.removeFromColumn(i, mark);
    return res;
  }

  isColumnFull(i) {
    return this.board[i].length === this.maxHeight;
  }

  onSwitchedMarks(fn) {
    [this.mark, this.opponentMark] = [this.opponentMark, this.mark];
    const res = fn();
    [this.mark, this.opponentMark] = [this.opponentMark, this.mark];
    return res;
  }

  getAvailableColumns(excludedColumns = []) {
    return this.columnsRange.filter(
      i => !excludedColumns.includes(i) && this.board[i].length < this.maxHeight
    );
  }
}
