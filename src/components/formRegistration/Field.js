
import React from "react";

const Field = props => {
    const {
        id,
        labelText,
        type,
        placeholder,
        name,
        value,
        onChange,
        error
           } = props;


    return (
        <div className="form-group">
            <label htmlFor={id}>{labelText}</label>
            <input
                id={id}
                type={type}
                className={ error ? "form-control is-invalid my"  : "form-control my ff "  }
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error ? <div className="error">{error}

            </div>
                : null}
        </div>
    );
};

export default Field;
