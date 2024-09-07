import React, { useState } from 'react';

import Button from '../../atoms/Button';
import GraphMonthly from './GraphMonthly';
import GraphTotal from './GraphTotal';

type Props = {
  year: number;
  month: number;
  timeUnit: string;
};

const RecordGraph: React.FC<Props> = ({ timeUnit }) => {
  const [mode, setMode] = useState(1);

  return (
    <>
      <Button className="btn-lg btn-primary" onClick={() => setMode(mode * -1)}>
        {mode === 1 ? 'Total Graph' : 'Monthly Graph'}
      </Button>

      {mode === 1 ? (
        <GraphMonthly timeUnit={timeUnit} />
      ) : (
        <GraphTotal timeUnit={timeUnit} />
      )}
    </>
  );
};

export { RecordGraph };
