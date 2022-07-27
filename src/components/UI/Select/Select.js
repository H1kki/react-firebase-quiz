import React from "react";
import classes from './Select.module.css'

const Select = props => {
    const htmlFor = `${props.label}-${Math.random()}`

    
    return(
        <div>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select 
            id={htmlFor}
            onChange={props.onChange}
            value={props.value}
            >
                { props.options.map((option, index) => {
                    return (
                    <option 
                        value={option.value} 
                        key={option.value + index}>
                            {option.text}
                    </option>
                    )
                }) }
            </select>
        </div>
    )
}

export default Select