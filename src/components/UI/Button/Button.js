import React from "react";
import classes from './Button.module.css'

const Button = ({type, onClick, children, disabled}) => {
    const cls = [
        classes.Button,
        classes[type]
    ]

    return (
        <button className={cls.join(' ')} onClick={onClick} disabled={disabled}>{children}</button>
    )
}

export default Button