import React, { ChangeEvent } from 'react';

type Props = {
    placeholder?: string;
    value?: string;
    onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    disabled?: boolean;
    required?: boolean;

}

const PasswordField: React.FC<Props> = (props) => {
    return (
        <input 
            type="password" 
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

export default PasswordField;