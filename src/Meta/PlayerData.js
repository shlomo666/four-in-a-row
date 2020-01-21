import React from 'react';
import Select from 'react-select';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { PlayerType } from '../enums';

const options = [
  { value: PlayerType.HUMAN, label: 'Human' },
  { value: PlayerType.AI, label: 'AI' }
];

const DEFAULT_LEVEL = 7;

function TextDiv({ children }) {
  return <div style={{ minWidth: 120 }}>{children}</div>;
}
function ComponentDiv({ children }) {
  return <div style={{ minWidth: 200, color: 'black' }}>{children}</div>;
}
function FlexDiv({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
  );
}

type PlayerMeta = {
  type: Number,
  level: Number
};

type Props = {
  data: PlayerMeta,
  turn: String,
  onChange: (data: PlayerMeta) => void
};

export default function PlayerData({ data, turn, onChange }: Props) {
  const currVal = options.find(option => option.value === data.type);
  return (
    <div
      style={{
        textAlign: 'left',
        padding: 20,
        fontFamily: 'arial'
      }}
    >
      <FlexDiv>
        <TextDiv>
          <span>{turn + ' Player:'}</span>
        </TextDiv>
        <ComponentDiv>
          <Select
            // theme={theme => ({
            //   ...(console.log(theme) || theme),
            //   // borderRadius: 0,
            //   colors: {
            //     ...Object.fromEntries(
            //       Object.entries(theme.colors).map(([k, v]) => [k, '#7f7878'])
            //     ),
            //     text: 'white',
            //     primary: '#7f7878',
            //     primary25: '#7f7878'
            //   }
            // })}
            value={currVal}
            onChange={type =>
              onChange({ type: type.value, level: data.level || DEFAULT_LEVEL })
            }
            options={options}
          />
        </ComponentDiv>
      </FlexDiv>
      {currVal.value === PlayerType.AI && (
        <div style={{ paddingTop: 10 }}>
          <FlexDiv>
            <TextDiv>
              <label>Level: </label>
            </TextDiv>
            <ComponentDiv>
              <Slider
                // style={{ backgroundColor: '#7f7878', color: 'white' }}
                min={1}
                max={8}
                value={data.level || DEFAULT_LEVEL}
                dots={true}
                onChange={level => onChange({ type: data.type, level })}
              />
            </ComponentDiv>
          </FlexDiv>
        </div>
      )}
    </div>
  );
}
