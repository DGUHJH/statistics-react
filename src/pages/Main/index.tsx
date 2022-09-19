import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  Bar,
  Box,
  BoxBar,
  BoxContainer,
  ChipContainer,
  ChipTitleTypo,
  Container,
  ContentButton,
  ContentButtonTypo,
  ContentChip,
  ContentInput,
  ContentTypo,
  Empty,
  InfoContainer,
  InputContainer,
  Root,
} from './styled';

const columns = [
  {
    title: 'Schema',
    dataIndex: 'schema',
    key: 'schema',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
];

const Main = () => {
  const [value, setValue] = useState<string>();
  const [dataList, setDataList] = useState<number[]>(
    [
      12.81, 14.95, 15.83, 19.9, 18.34, 19.82, 19.94, 20.62, 36.73, 20.88,
      20.93, 20.98, 21.15, 22.24, 23.16, 22.24, 23.16, 23.56, 35.78,
    ].sort()
  );

  const onClickDeleteData = (id: number) => () => {
    setDataList((prev) => prev.filter((value, index) => index !== id));
  };

  const onClickAddData = () => {
    if (value) {
      if (isNaN(+value)) {
        message.error('number을 입력해주세요.');
        setValue(undefined);
        return;
      }
      setDataList((prev) => [...prev, +value].sort());
      setValue(undefined);
      return;
    }
    message.error('데이터를 입력해주세요.');
  };

  const onPressEnter = (e: any) => {
    if (e.key === 'Enter') {
      onClickAddData();
      return;
    }
  };

  const getQ = (type: 'Q1' | 'M' | 'Q3') => {
    const dataLength = dataList.length;
    if (type === 'Q1') {
      return (
        (dataList[Math.floor((dataLength * 1) / 4)] +
          dataList[Math.floor((dataLength * 1) / 4) - 1]) /
        2
      );
    }
    if (type === 'M') {
      return (
        (dataList[Math.floor((dataLength * 2) / 4)] +
          dataList[Math.floor((dataLength * 2) / 4) - 1]) /
        2
      );
    }
    return (
      (dataList[Math.floor((dataLength * 3) / 4)] +
        dataList[Math.floor((dataLength * 3) / 4) - 1]) /
      2
    );
  };

  const iqr = getQ('Q3') - getQ('Q1');
  const right = getQ('Q3') + iqr * 1.5;
  const left = getQ('Q1') - iqr * 1.5;

  const min = (() => {
    let result = 0;
    let check = true;
    let condition = left;
    dataList.forEach((dataItem, index) => {
      if (dataItem >= condition && check) {
        index !== dataList.length - 1 && (result = index + 1);
        check = false;
      }
    });
    return dataList[result];
  })();

  const max = (() => {
    let result = 0;
    let condition = right;
    dataList.forEach((dataItem, index) => {
      if (dataItem < condition) {
        index !== 0 && (result = index - 1);
      }
    });
    return dataList[result];
  })();

  const dataSource = [
    {
      key: '1',
      schema: 'Q1',
      value: getQ('Q1'),
    },
    {
      key: '2',
      schema: 'M',
      value: getQ('M'),
    },
    {
      key: '3',
      schema: 'Q3',
      value: getQ('Q3'),
    },
    {
      key: '4',
      schema: 'IQR (Q3 - Q1)',
      value: iqr.toFixed(2),
    },
    {
      key: '5',
      schema: '좌측경계',
      value: left.toFixed(2),
    },
    {
      key: '6',
      schema: '우측경계',
      value: right.toFixed(2),
    },
    {
      key: '7',
      schema: 'min',
      value: min.toFixed(2),
    },
    {
      key: '8',
      schema: 'max',
      value: max.toFixed(2),
    },
  ];

  return (
    <Root>
      <Container>
        <InfoContainer>
          <ContentTypo>
            ex28) 다음 자료는 중년 남성의 20명의 폐활량을 조사한 것이다.
            상자그림을 그리시오.
          </ContentTypo>
        </InfoContainer>
        <ChipContainer>
          <ChipTitleTypo level={4}>데이터 목록</ChipTitleTypo>
          {dataList.map((dataItem, index) => (
            <ContentChip
              onClick={onClickDeleteData(index)}
              key={`data_item_${index}`}
            >
              {dataItem}
            </ContentChip>
          ))}
        </ChipContainer>
        <InputContainer>
          <ContentInput
            placeholder='데이터를 입력해주세요.'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onPressEnter}
          />
          <ContentButton onClick={onClickAddData}>
            <ContentButtonTypo>추가</ContentButtonTypo>
          </ContentButton>
        </InputContainer>
        <BoxContainer>
          <Empty width={(((min - left) / iqr) * 300) / 4} />
          <Bar width={(((getQ('Q1') - min) / iqr) * 300) / 4} />
          <Box>
            <BoxBar marginLeft={(((getQ('M') - getQ('Q1')) / iqr) * 300) / 4} />
          </Box>
          <Bar width={(((max - getQ('Q3')) / iqr) * 300) / 4} />
          <Empty width={(((right - max) / iqr) * 300) / 4} />
        </BoxContainer>
        <InfoContainer>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </InfoContainer>
      </Container>
    </Root>
  );
};

export default Main;
