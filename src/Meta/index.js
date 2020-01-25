import React from 'react';
import PlayerData from './PlayerData';

export default class Meta extends React.Component {
  constructor(props) {
    super(props);
    const { first, second } = this.props;
    this.state = {
      first,
      second
    };
  }

  render() {
    const { first, second } = this.state;
    const { onChange = () => {}, onRestart } = this.props;

    return (
      <div
        style={{
          margin: 20,
          backgroundColor: '#7f7878',
          display: 'grid',
          gridTemplateColumns: 'min-content',
          borderRadius: '30px',
          color: 'white',
          fontWeight: 'bold'
        }}
      >
        <PlayerData
          data={first}
          turn={'First'}
          onChange={first =>
            this.setState({ ...this.state, first }) &&
            onChange({ first, second })
          }
        />
        <PlayerData
          data={second}
          turn={'Second'}
          onChange={second =>
            this.setState({ ...this.state, second }) &&
            onChange({ first, second })
          }
        />

        <button
          style={{
            margin: 20,
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: 25,
            fontFamily: 'arial',
            fontWeight: 'bold',
            color: 'white',
            background:
              'repeating-linear-gradient(45deg, transparent, black, transparent 100%)',
            borderRadius: 15
          }}
          onClick={() => onRestart({ ...this.state })}
        >
          Restart
        </button>
      </div>
    );
  }
}
