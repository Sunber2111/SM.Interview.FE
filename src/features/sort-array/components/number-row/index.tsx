// react
import React from 'react';

// app
import { NumberRowWrapper } from './styles';

interface Props {
  value: number;
}

const NumberRow = ({ value }: Props) => {
  return <NumberRowWrapper>{value}</NumberRowWrapper>;
};

export default React.memo(NumberRow);
