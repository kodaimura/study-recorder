import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

type Props = {
    year?: number,
    month?: number,
    setYear: (year: number) => void,
    setMonth: (month: number) => void,
}

const SelectDate: React.FC<Props> = (props) => {
    const d = new Date();
    const [y, setY] = useState(props.year !== undefined ? props.year : d.getFullYear());
    const [m, setM] = useState(props.month !== undefined ? props.month : d.getMonth() + 1);

    const addYear = () => {
        const newYear = y + 1;
        props.setYear(newYear);
        setY(newYear);
    }

    const subYear = () => {
        const newYear = y - 1;
        props.setYear(newYear);
        setY(newYear);
    }

    const addMonth = () => {
        let newMonth = m + 1;
        let newYear = y;
        if (newMonth > 12) {
            newMonth = 1;
            newYear = y + 1;
        }
        props.setMonth(newMonth);
        setM(newMonth);
        props.setYear(newYear);
        setY(newYear);
    }

    const subMonth = () => {
        let newMonth = m - 1;
        let newYear = y;
        if (newMonth < 1) {
            newMonth = 12;
            newYear = y - 1;
        }
        props.setMonth(newMonth);
        setM(newMonth);
        props.setYear(newYear);
        setY(newYear);
    }

    return (
        <div className="d-flex">
            <div className="btn-group me-2">
                <Button
                    className='btn-sm'
                    onClick={subYear}
                >
                    &lt;&lt;
                </Button>
                <Button disabled>{y}</Button>
                <Button
                    className='btn-sm'
                    onClick={addYear}
                >
                    &gt;&gt;
                </Button>
            </div>

            <div className="btn-group">
                <Button
                    className='btn-sm'
                    onClick={subMonth}
                >
                    &lt;
                </Button>
                <Button disabled>{m}</Button>
                <Button
                    className='btn-sm'
                    onClick={addMonth}
                >
                    &gt;
                </Button>
            </div>
        </div>
    );
}

export { SelectDate };
