import styled from 'styled-components/macro';
import { uiConstants } from './common';

export const PlayGameContianer = styled.div`
  text-align: center;
  margin: auto;
  background-color: #282c34;
  min-height: 100vh;
  max-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const [width, minWidth, maxWidth] = ['40vmax', '300px', '600px'];
export const MessageAndBoardContainer = styled.div`
  width: ${width};
  height: calc(${width} + ${uiConstants.messageBoxHeightArithmetic});
  min-width: ${minWidth};
  min-height: calc(${minWidth} + ${uiConstants.messageBoxHeightArithmetic});
  max-width: ${maxWidth};
  max-height: calc(${maxWidth} + ${uiConstants.messageBoxHeightArithmetic});
  padding: 10px;
`;

export const MessageBox = styled.div`
  padding: 10px 0;
  width: 100%;
  font-size: calc(${uiConstants.messageBoxFontArithmetic});
  min-height: calc(${uiConstants.messageBoxHeightArithmetic});
`;

export const Message = styled.p`
  margin: 0 0;
  color: white;
  font-weight: bold;
  min-height: calc(${uiConstants.messageBoxFontArithmetic});
`;
