import React from 'react';
import _ from 'lodash';

import Board from './Board';
import Meta from './Meta';
import { PlayerType, PlayerTurn } from './enums';

import {
  PlayGameContianer,
  MessageAndBoardContainer,
  MessageBox,
  Message
} from './AppStyledElements';
import gameVaraiables from './gameVaraiables';
import {
  performAIMove,
  isGameOver,
  lastEngine,
  switchPlayer,
  isCurrentPlayerType,
  getCurrentEngine,
  getCurrentMark,
  setBoard,
  nextPlayer
} from './Tournament';

export default class App extends React.Component {
  state = {
    steps: window.location.pathname
      .split('/')
      .pop()
      .split('')
      .map(parseFloat)
      .filter(n => !isNaN(n))
  };

  constructor(props) {
    super(props);

    window.onpopstate = e => {
      if (e.state) {
        setBoard(e.state.steps);
        this.appendState({ steps: e.state.steps });
      }
    };
    setBoard(this.state.steps);

    this.gameOver = false;
  }

  componentDidMount() {
    this.checkAI();
  }

  componentDidUpdate() {
    this.checkAI();
  }

  checkAI() {
    if (!this.gameOver) {
      if (isGameOver()) {
        this.gameOver = true;
        gameVaraiables.gameMessage = getCurrentEngine().lost()
          ? `Player ${nextPlayer()} Won!`
          : `It's a Draw`;
        this.appendState();
      } else if (isCurrentPlayerType(PlayerType.AI)) {
        setTimeout(() => {
          performAIMove(this.onStep);
        }, 100);
      }
    }
  }

  onStep = step => {
    if (isCurrentPlayerType(PlayerType.HUMAN)) {
      getCurrentEngine().appendToColumn(step, getCurrentMark());
      gameVaraiables.gameMessage = '';
    }
    switchPlayer();
    this.appendState({ steps: [...this.state.steps, step] });
  };

  appendState(obj) {
    if (_.get(obj, 'steps') && !_.isEqual(obj.steps, this.state.steps)) {
      App.updateWindowState(obj.steps);
    }
    this.setState({ ...this.state, ...obj });
  }

  static updateWindowState(steps) {
    window.history.pushState({ steps }, '4 In a Row', '/' + steps.join(''));
  }

  render() {
    const { steps } = this.state;
    const {
      gameMessage,
      width,
      height,
      board,
      meta,
      currentPlayer,
      engineFirst
    } = gameVaraiables;
    const lastColumn = lastEngine().stats.lastColumn;

    return (
      <PlayGameContianer>
        <MessageAndBoardContainer>
          <MessageBox>
            <Message>{gameMessage}</Message>
          </MessageBox>
          <Board
            steps={steps}
            onStep={this.onStep}
            meta={meta}
            isGameOver={isGameOver()}
            width={width}
            height={height}
            board={board}
            lastColumn={lastColumn}
            lastColor={currentPlayer === PlayerTurn.SECOND ? 'red' : 'blue'}
            availableColumns={engineFirst.getAvailableColumns()}
            humanTurn={isCurrentPlayerType(PlayerType.HUMAN)}
          />
        </MessageAndBoardContainer>
        <Meta
          first={meta.first}
          second={meta.second}
          onRestart={this.onRestart}
        />
      </PlayGameContianer>
    );
  }

  onRestart = meta => {
    this.gameOver = false;
    gameVaraiables.meta = meta;
    gameVaraiables.gameMessage = '';
    setBoard([]);
    this.appendState({ steps: [] });
  };

  // onMessage(message) {
  //   if (this.atLeastOneHumanPlayer() && this.state.message !== message) {
  //     this.appendState({ message });
  //   }
  // }

  // atLeastOneHumanPlayer() {
  //   const { first, second } = this.state.meta;
  //   return first.type === PlayerType.HUMAN || second.type === PlayerType.HUMAN;
  // }
}
