import React, { useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

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
        <div className="date-selector">
            <ButtonGroup className="date-step-group">
                <Button
                    variant="link"
                    onClick={subYear}
                    aria-label="前年"
                >
                    <i className="bi bi-chevron-double-left"></i>
                </Button>
                <Button
                    variant="link"
                    onClick={subMonth}
                    aria-label="前月"
                >
                    <i className="bi bi-chevron-left"></i>
                </Button>
            </ButtonGroup>

            <div className="date-current">
                <span className="date-year">{y}</span>
                <small>年</small>
                <span className="date-month">{m}</span>
                <small>月</small>
            </div>

            <ButtonGroup className="date-step-group">
                <Button
                    variant="link"
                    onClick={addMonth}
                    aria-label="翌月"
                >
                    <i className="bi bi-chevron-right"></i>
                </Button>
                <Button
                    variant="link"
                    onClick={addYear}
                    aria-label="翌年"
                >
                    <i className="bi bi-chevron-double-right"></i>
                </Button>
            </ButtonGroup>
        </div>
    );
}

export { SelectDate };
