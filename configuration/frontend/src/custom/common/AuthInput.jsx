import React from 'react';
import {FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const AuthInput = ({name, title, onChange, type, className, formFeedback, required, valid, invalid, onBlur}) => {
    return  (
        <FormGroup className={className}>
            <Label htmlFor={name}>{title}</Label>
            <Input valid={valid} invalid={invalid}
                type={type} id={name}
                onChange={onChange}
                placeholder={title}
                name={name}
                onBlur={onBlur}
                required={required}
            />
            <FormFeedback>
                {formFeedback}
            </FormFeedback>
        </FormGroup>
    );
};

export default AuthInput;