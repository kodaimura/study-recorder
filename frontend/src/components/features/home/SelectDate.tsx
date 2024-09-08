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
            <ButtonGroup className="me-2">
                <Button
                    variant="light"
                    onClick={subYear}
                >
                    &lt;&lt;
                </Button>
                <Button
                    variant="light" 
                    disabled
                >
                    {y}
                </Button>
                <Button
                    variant="light"
                    onClick={addYear}
                >
                    &gt;&gt;
                </Button>
            </ButtonGroup>

            <ButtonGroup>
                <Button
                    variant="light"
                    onClick={subMonth}
                >
                    &lt;
                </Button>
                <Button 
                    variant="light"
                     disabled
                >
                    {m}
                </Button>
                <Button
                    variant="light"
                    onClick={addMonth}
                >
                    &gt;
                </Button>
            </ButtonGroup>
        </>
    );
}

export { SelectDate };
