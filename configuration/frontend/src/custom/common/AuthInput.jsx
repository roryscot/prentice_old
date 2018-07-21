import React from 'react';
import {FormGroup, Label, Input } from 'reactstrap';

const AuthInput = ({name, title, onChange, type, className, required}) => {
    return  (
        <FormGroup className={className}>
            <Label htmlFor={name}>{title}</Label>
            <Input
                type={type} id={name}
                onChange={onChange}
                placeholder={title}
                name={name}
                required={required}
            />
        </FormGroup>
    );
};

export default AuthInput;