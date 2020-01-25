import _ from 'lodash';

export default class Calc {
  static formSeries(w, h) {
    const verticals = _.flatten(
      _.range(w).map(x =>
        _.range(h - (4 - 1)).map(y => _.range(4).map(i => ({ x, y: y + i })))
      )
    );
    const horisontals = _.flatten(
      _.range(h).map(y =>
        _.range(w - (4 - 1)).map(x => _.range(4).map(i => ({ x: x + i, y })))
      )
    );
    const diagDown = _.flatten(
      _.range(0, h - (4 - 1)).map(y =>
        _.range(w - (4 - 1)).map(x =>
          _.range(4).map(i => ({ x: x + i, y: y + i }))
        )
      )
    );
    const diagUp = _.flatten(
      _.range(0, h - (4 - 1)).map(y =>
        _.range(w - (4 - 1)).map(x =>
          _.range(4).map(i => ({ x: x + i, y: 4 - 1 + y - i }))
        )
      )
    );

    const series = [...verticals, ...horisontals, ...diagDown, ...diagUp];
    return series;
  }

  static stringifyCell(cell: { x: Number, y: Number }) {
    return `${cell.x},${cell.y}`;
  }

  static getLastCellAsString(board: string[][], i) {
    const x = i;
    const y = board[i].length - 1;
    return `${x},${y}`;
  }
}
