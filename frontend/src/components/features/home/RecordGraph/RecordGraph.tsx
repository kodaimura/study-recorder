import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import GraphMonthly from './GraphMonthly';
import GraphTotal from './GraphTotal';

type Props = {
  year: number;
  month: number;
  timeUnit: string;
};

const RecordGraph: React.FC<Props> = ({ timeUnit, year, month }) => {
  const [mode, setMode] = useState(1);

  return (
    <>
      <Button className="btn-lg btn-primary" onClick={() => setMode(mode * -1)}>
        {mode === 1 ? '累計グラフ' : '月毎グラフ'}
      </Button>

      {mode === 1 ? (
        <GraphMonthly timeUnit={timeUnit} year={year} month={month} />
      ) : (
        <GraphTotal timeUnit={timeUnit} />
      )}
    </>
  );
};

export { RecordGraph };
