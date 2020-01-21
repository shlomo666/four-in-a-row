import React from 'react';

import Board from './Board';
import Meta from './Meta';
import { PlayerType } from './enums';

import {
  PlayGameContianer,
  MessageAndBoardContainer,
  MessageBox,
  Message
} from './PlayGameStyled';

export default class GamePlay extends React.Component {
  state = {
    meta: {
      first: { type: PlayerType.HUMAN },
      second: { type: PlayerType.AI, level: 7 }
    },
    message: ''
  };

  render() {
    const { message, meta } = this.state;

    return (
      <PlayGameContianer>
        <MessageAndBoardContainer>
          <MessageBox>
            <Message>{message}</Message>
          </MessageBox>
          <Board
            meta={meta}
            onMessage={message =>
              this.atLeastOneHumanPlayer() &&
              this.setState({ ...this.state, message })
            }
          />
        </MessageAndBoardContainer>
        <Meta
          first={meta.first}
          second={meta.second}
          onChange={meta => {}}
          onRestart={meta => this.setState({ meta, message: null })}
        />
      </PlayGameContianer>
    );
  }

  atLeastOneHumanPlayer() {
    const { first, second } = this.state.meta;
    return first.type === PlayerType.HUMAN || second.type === PlayerType.HUMAN;
  }
}
