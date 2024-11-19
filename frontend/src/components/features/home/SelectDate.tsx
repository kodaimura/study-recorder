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
        <>
    <div className="d-flex justify-content-between">
        <ButtonGroup className="shadow-sm">
            <Button
                variant="outline-dark"
                onClick={subYear}
                className="rounded-start py-2 px-3"
            >
                <i className="bi bi-chevron-double-left"></i>
            </Button>
            <Button
                variant="outline-dark"
                disabled
                className="py-2 px-4 fw-bold"
            >
                {y} 年
            </Button>
            <Button
                variant="outline-dark"
                onClick={addYear}
                className="rounded-end py-2 px-3"
            >
                <i className="bi bi-chevron-double-right"></i>
            </Button>
        </ButtonGroup>

        <ButtonGroup className="shadow-sm">
            <Button
                variant="outline-dark"
                onClick={subMonth}
                className="rounded-start py-2 px-3"
            >
                <i className="bi bi-chevron-left"></i>
            </Button>
            <Button
                variant="outline-dark"
                disabled
                className="py-2 px-4 fw-bold"
            >
                {m} 月
            </Button>
            <Button
                variant="outline-dark"
                onClick={addMonth}
                className="rounded-end py-2 px-3"
            >
                <i className="bi bi-chevron-right"></i>
            </Button>
        </ButtonGroup>
    </div>
</>
    );
}

export { SelectDate };
