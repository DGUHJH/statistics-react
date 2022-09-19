import { Button, Input, InputNumber, Typography } from 'antd';
import styled from 'styled-components';

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 200px;
`;

export const Container = styled.div`
  width: 320px;
  margin-top: 20px;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

export const ContentTypo = styled(Typography)``;

export const ContentInput = styled(Input)``;

export const ContentButton = styled(Button)``;
export const ContentButtonTypo = styled(Typography)``;

export const ChipContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px #0003 solid;
  border-radius: 5px;
  margin: 20px 0;
`;

export const ChipTitleTypo = styled(Typography.Title)`
  width: 100%;
  text-align: center;
`;

export const ContentChip = styled.div`
  background: #0f02;
  padding: 5px 10px;
  border: 1px #0f05 solid;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
  :hover {
    background: #f002;
    border: 1px #f005 solid;
  }
`;

export const BoxContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border: 1px #0003 solid;
  margin-top: 20px;
`;

type EmptyProps = {
  width: number;
};

export const Empty = styled.div<EmptyProps>`
  width: ${(props) => props.width}px;
  height: calc(300px / 4);
  background: #f003;
`;

type BarProps = {
  width: number;
};

export const Bar = styled.div<BarProps>`
  width: ${(props) => props.width}px;
  height: 2px;
  background: #c9c9c9;
`;

export const Box = styled.div`
  width: calc(300px / 4);
  height: calc(300px / 4);
  display: flex;
  align-items: center;
  border: 2px #c9c9c9 solid;
`;

type BoxBarProps = {
  marginLeft: number;
};

export const BoxBar = styled.div<BoxBarProps>`
  width: 2px;
  height: calc(300px / 4);
  background: #c9c9c9;
  margin-left: ${(props) => props.marginLeft - 1}px;
`;
