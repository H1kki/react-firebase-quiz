import React from "react";
import classes from './Input.module.css'

function isInvalid({valid, shouldValidate, touched}) {
    return !valid && shouldValidate && touched
}

const Input = props => {
    const cls = [classes.Input]
    const inputType = props.type || 'text'
    const htmlFor = `${inputType}-${Math.random()}`
    if(isInvalid(props)) {
        cls.push(classes.invalid)
    }

    return(
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input 
            type={inputType} 
            id={htmlFor}
            onChange={props.onChange}
            value={props.value}
            />

            {
                isInvalid(props) ?
                <span>{props.errorMessage}</span> :
                null
            }
        </div>
    )
}

export default Input