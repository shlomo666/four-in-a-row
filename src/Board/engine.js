import _ from 'lodash';
import Calc from './Calc';
import Infrastructure from './Infrastructure';

const messageList = [
  'Give me your best shot!',
  'you like that?',
  'Failed to see this coming, ha?',
  'Come on, show me what you got!'
];

export default class Engine extends Infrastructure {
  constructor(params) {
    super(params);

    this.boardRange = _.range(this.board.length);
  }

  takeStep() {
    this.win() ||
      this.blockLose() ||
      this.have2WaysToWin() ||
      this.block2WaysToLose() ||
      this.takeSmartStep();
  }

  takeSmartStep() {
    const bestChoise = this.getBestChoise();
    this.appendToColumn(bestChoise, this.mark);
    this.message = _.sample(messageList);
  }

  /** @returns {number} The index of the best column to choose */
  getBestChoise() {
    const scores = this.getScoreForPosition(this.aiLevel, this.mark, true);
    return _.maxBy(
      _.range(this.board.length).filter(
        i => this.board[i].length < this.maxHeight
      ),
      i => scores[i]
    );
  }

  getScoreForPosition(n, mark, isRoot = false) {
    const stateScores = [];
    const results = _.range(this.board.length).map(i =>
      this.wrapFillColumnTemp(i, mark, () => {
        const lastCell = Calc.getLastCellAsString(this.board, i);
        if (this.won(lastCell)) {
          return 1;
        }
        if (this.lost(lastCell)) {
          return -1;
        }

        const stateScore = this.stateScore();
        stateScores[i] = stateScore;
        return 0;
      })
    );

    const stateScoresForFurtherDeep = [...stateScores]
      .sort((a, b) => (mark === this.mark ? b - a : a - b))
      .slice(0, 4);

    const scores = results.map((result, i) => {
      return this.wrapFillColumnTemp(i, mark, () => {
        if (result === 1) return this.factor(n);
        if (result === -1) return -this.factor(n);

        if (n === 1) {
          return stateScores[i];
        } else if (!stateScoresForFurtherDeep.includes(stateScores[i])) {
          return -Infinity;
        } else {
          return this.getScoreForPosition(n - 1, this.toggleMark(mark));
        }
      });
    });

    return isRoot ? scores : _.sum(scores.filter(n => n !== -Infinity));
  }

  stateScore() {
    return (
      _.sumBy(
        this.series.filter(
          counterByMark =>
            counterByMark[this.mark] > 0 &&
            counterByMark[this.opponentMark] === 0
        ),
        counterByMark => counterByMark[this.mark]
      ) -
      _.sumBy(
        this.series.filter(
          counterByMark =>
            counterByMark[this.mark] === 0 &&
            counterByMark[this.opponentMark] > 0
        ),
        counterByMark => counterByMark[this.opponentMark]
      )
    );
  }

  everyStepMatching(mark, fn) {
    return this.boardRange.every(i => {
      if (this.board[i].length === this.maxHeight) return true;

      this.appendToColumn(i, mark);
      const res = fn();
      this.removeFromColumn(i, mark);
      return res;
    });
  }
  findStepMatching(mark, fn) {
    return this.boardRange.find(i => {
      if (this.board[i].length === this.maxHeight) return false;

      this.appendToColumn(i, mark);
      const res = fn();
      this.removeFromColumn(i, mark);
      return res;
    });
  }

  findStepsMatching(mark, fn) {
    return this.boardRange.filter(i => {
      if (this.board[i].length === this.maxHeight) return false;

      this.appendToColumn(i, mark);
      const res = fn();
      this.removeFromColumn(i, mark);
      return res;
    });
  }

  canWinCell() {
    return this.findStepMatching(this.mark, () => this.won());
  }
  canWin() {
    return this.canWinCell() !== undefined;
  }

  canLoseCell() {
    return this.findStepMatching(this.opponentMark, () => this.lost());
  }
  canLose() {
    return this.canLoseCell() !== undefined;
  }

  win() {
    const winningCell = this.canWinCell();

    if (winningCell !== undefined) {
      this.appendToColumn(winningCell, this.mark);
      this.message = 'Got ya!';
    }

    return winningCell !== undefined;
  }

  blockLose() {
    const losingCell = this.canLoseCell();

    if (losingCell !== undefined) {
      this.appendToColumn(losingCell, this.mark);
      this.message = 'Blocked ya!';
    }

    return losingCell !== undefined;
  }

  have2WaysToWin(takeAction = true) {
    const cell = this.findStepMatching(
      this.mark,
      () =>
        !this.canLose() &&
        this.everyStepMatching(this.opponentMark, () => this.canWin())
    );

    if (cell !== undefined && takeAction) {
      this.appendToColumn(cell, this.mark);
      this.message = 'Got ya in 2 ways!';
    }

    return cell !== undefined;
  }

  onSwitchedMarks(fn) {
    [this.mark, this.opponentMark] = [this.opponentMark, this.mark];
    const res = fn();
    [this.mark, this.opponentMark] = [this.opponentMark, this.mark];
    return res;
  }

  block2WaysToLose() {
    return false;
    // const cellsToLose = this.findStepsMatching(this.mark, () =>
    //   this.onSwitchedMarks(() => this.have2WaysToWin(false))
    // );
    const cellsToLose = this.findStepsMatching(this.mark, () =>
      this.findStepMatching(
        this.opponentMark,
        () =>
          !this.canWin() &&
          this.everyStepMatching(this.mark, () => this.canLose())
      )
    );

    if (cellsToLose.length > 0) {
      const cellsToBlock = _.range(this.board.length).filter(
        i => !cellsToLose.includes(i) && this.board[i].length < this.maxHeight
      );
      console.log({ cellsToBlock, cellsToLose });

      if (cellsToBlock.length === 0) return false;

      const cell = _.maxBy(cellsToBlock, cell =>
        this.wrapFillColumnTemp(cell, this.mark, () => this.stateScore())
      );
      this.appendToColumn(cell, this.mark);
      this.message = 'Blocked ya from 2 ways!';
    }

    return cellsToLose.length > 0;
  }
}
