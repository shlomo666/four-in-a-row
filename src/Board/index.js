import React from 'react';
import _ from 'lodash';
import { uiConstants } from '../common';
import styled from 'styled-components/macro';
import { firstMark } from '../gameVaraiables';
const padding = 10;

const BoardContainer = styled.div`
  width: calc(100% - ${padding * 2}px);
  height: calc(
    100% - ${padding * 2}px - (${uiConstants.messageBoxHeightArithmetic})
  );
  background-color: #7f7878;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding: ${padding}px;
`;

type Props = {
  meta: {
    first: { type: Number, level?: Number },
    second: { type: Number, level?: Number }
  },
  steps: number[],
  onStep: (col: number) => void,
  isGameOver: Boolean,
  width: Number,
  height: Number,
  board: any[][],
  lastColumn: Number,
  lastColor: String,
  availableColumns: Number[],
  humanTurn: Boolean
};

export default class Board extends React.Component<Props> {
  render() {
    const { isGameOver, width, height, board, lastColumn } = this.props;

    return (
      <BoardContainer>
        {_.rangeRight(height)
          .map(i => board.map(col => Cell(col[i])))
          .flat()}
        {_.range(width).map(i => this.button(i, isGameOver, lastColumn === i))}
      </BoardContainer>
    );
  }

  button(i, isGameOver, isLastColumn) {
    const { lastColor, availableColumns, onStep, humanTurn } = this.props;

    let onClick = () => {};
    if (!isGameOver && humanTurn && availableColumns.includes(i)) {
      onClick = () => onStep(i);
    }

    return (
      <button
        style={{
          borderRadius: '10px',
          background: isGameOver
            ? `repeating-linear-gradient(45deg, black, ${lastColor} 100%)`
            : isLastColumn
            ? `repeating-linear-gradient(45deg, ${lastColor}, transparent 100%)`
            : 'repeating-linear-gradient(45deg, black, transparent 100%)',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '2.7vw'
        }}
        key={i}
        onClick={onClick}
      >
        {i + 1}
      </button>
    );
  }
}

function Cell(mark) {
  const color = mark === firstMark ? 'red' : 'blue';
  return (
    <div
      key={_.random(1e9)}
      style={{
        border: mark ? `0.9vw solid ${color}` : 'none',
        borderRadius: '100%',
        background: mark
          ? mark === firstMark
            ? `radial-gradient(circle, red 60%,transparent 100%)`
            : `radial-gradient(circle, blue 60%, violet 90%)`
          : 'gray'
      }}
    ></div>
  );
}
