import React from 'react';

const AuthInput = (props) => {
    const {name, title, onChange, type, className} = props;
    return  (
        <div className={className}>
            <label htmlFor={name}>{title}</label>
            <input
                type={type} id={name}
                onChange={onChange}
                placeholder={title}
                name={name}
                required
            />
        </div>
    );
};

export default AuthInput;