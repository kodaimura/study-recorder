import React, { ChangeEvent } from 'react';

type Props = {
    placeholder?: string;
    value?: number;
    onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    required?: boolean;

}

const NumberField: React.FC<Props> = (props) => {
    return (
        <input 
            type="number" 
            placeholder={props.placeholder} 
            value={props.value} 
            onChange={props.onChange} 
            onInput={props.onInput} 
            className={`form-control ${props.className}`}
            disabled={props.disabled?? false}
            required={props.required?? false}
        />
    );
};

export default NumberField;