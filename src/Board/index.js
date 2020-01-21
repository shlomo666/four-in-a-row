import React from 'react';
import Engine from './engine';
import _ from 'lodash';
import { PlayerType } from '../enums';
import { uiConstants } from '../common';
import styled from 'styled-components/macro';

const padding = 10;

styled.div`
  width: calc(100% - ${padding * 2}px),
  height: calc(100% - ${padding * 2}px - (${
  uiConstants.messageBoxHeightArithmetic
})),
  backgroundColor: #7f7878,
  display: grid,
  gridTemplateColumns: repeat(7, 1fr),
  gridTemplateRows: repeat(7, 1fr),
  gridRowGap: 10,
  gridColumnGap: 10,
  padding: ${padding}
`;

const Player = {
  FIRST: 1,
  SECOND: 2
};

type Props = {
  meta: {
    first: { type: Number, level?: Number },
    second: { type: Number, level?: Number }
  },
  board: String[][]
};

export default class Board extends React.Component<Props> {
  state = { currentPlayer: Player.FIRST };

  constructor(props) {
    super(props);
    this.setup();
  }

  setup() {
    const { meta, board } = this.props;
    this.firstMark = 'x';
    this.secondMark = 'o';

    this.meta = meta;

    const basicInfo = {
      board: board || _.range(7).map(i => []),
      boardColumns: 7,
      boardRows: 6
    };
    this.engineFirst = new Engine({
      ...basicInfo,
      opponentMark: this.secondMark,
      aiMark: this.firstMark,
      aiLevel: meta.first.level
    });
    this.engineSecond = new Engine({
      ...basicInfo,
      opponentMark: this.firstMark,
      aiMark: this.secondMark,
      aiLevel: meta.second.level,
      refs: {
        series: this.engineFirst.series,
        seriesByCell: this.engineFirst.seriesByCell
      }
    });

    window.engine = this.engineSecond;
    window._ = _;
    window.userSteps = this.userSteps = [];

    this.height = basicInfo.boardRows;
    this.board = this.engineFirst.board;
    this.width = basicInfo.boardColumns;
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state = { currentPlayer: Player.FIRST };
  }

  render() {
    if (this.meta !== this.props.meta) {
      this.restart();
    }

    let isGameOver = false;
    if (this.currentEngine.lost()) {
      console.log(`Player ${this.nextPlayer()} Won!`);
      isGameOver = true;
    } else if (this.currentEngine.isTie()) {
      console.log(`It's a Tie!`);
      isGameOver = true;
    } else if (this.isCurrentPlayerType(PlayerType.AI)) {
      setTimeout(() => {
        this.currentEngine.takeStep();
        this.setState({ currentPlayer: this.nextPlayer() });
        this.props.onMessage(this.nextEngine.message);
      }, 0);
    }

    return (
      <div
        style={{
          width: 'calc(100% - 20px)', // 100% - padding
          height: 'calc(100% - 20px - 15px - 2vmin)', // 100% - padding - top dock
          backgroundColor: '#7f7878',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: 'repeat(7, 1fr)',
          gridRowGap: 10,
          gridColumnGap: 10,
          padding: 10
        }}
      >
        {_.rangeRight(this.height)
          .map(i => this.board.map(col => Cell(col[i])))
          .flat()}
        {_.range(this.width).map(i =>
          this.button(i, isGameOver, this.nextEngine.lastColumn === i)
        )}
      </div>
    );
  }

  restart() {
    this.setup();
  }

  isCurrentPlayerType(n) {
    const { currentPlayer } = this.state;

    return currentPlayer === Player.FIRST
      ? this.meta.first.type === n
      : this.meta.second.type === n;
  }

  get currentEngine() {
    const { currentPlayer } = this.state;
    return currentPlayer === Player.FIRST
      ? this.engineFirst
      : this.engineSecond;
  }

  get nextEngine() {
    const { currentPlayer } = this.state;
    return currentPlayer === Player.FIRST
      ? this.engineSecond
      : this.engineFirst;
  }

  get currentMark() {
    const { currentPlayer } = this.state;
    return currentPlayer === Player.FIRST ? this.firstMark : this.secondMark;
  }

  button(i, isGameOver, isLastColumn) {
    const currentColor = this.currentMark === 'x' ? 'blue' : 'red';

    return (
      <button
        style={{
          borderRadius: '10px',
          background: isGameOver
            ? `repeating-linear-gradient(45deg, black, ${currentColor} 100%)`
            : isLastColumn
            ? `repeating-linear-gradient(45deg, ${currentColor}, transparent 100%)`
            : 'repeating-linear-gradient(45deg, black, transparent 100%)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '2.7vw'
        }}
        key={i}
        onClick={() => {
          if (!isGameOver && this.board[i].length < this.height) {
            if (this.isCurrentPlayerType(PlayerType.HUMAN)) {
              this.userSteps.push(i);
              this.currentEngine.appendToColumn(i, this.currentMark);
              this.setState({ currentPlayer: this.nextPlayer() });
            }
          }
        }}
      >
        {i + 1}
      </button>
    );
  }

  nextPlayer() {
    return 3 - this.state.currentPlayer;
  }
}

function Cell(mark) {
  const color = mark === 'x' ? 'red' : 'blue';
  return (
    <div
      key={_.random(1e9)}
      style={{
        border: mark ? `0.9vw solid ${color}` : 'none',
        borderRadius: '100%',
        background: mark
          ? mark === 'x'
            ? `radial-gradient(circle, red 60%,transparent 100%)`
            : `radial-gradient(circle, blue 60%, violet 90%)`
          : 'gray'
      }}
    ></div>
  );
}
