import React from 'react';

const AuthInput = ({name, title, onChange, type, className}) => {
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