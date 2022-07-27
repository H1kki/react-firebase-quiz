import React from "react";
import classes from './AnswerList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswerList = props => {
    console.log(props)
    return(
        <ul className={classes.AnswerList}>
            {props.answers.map((answer, index) => {
                return(
                <AnswerItem answer={answer} 
                    key={index} 
                    onClickAnswer={props.onClickAnswer}
                    state={props.state ? props.state[answer.id] : null}
                />
                )
            })}
        </ul>
    )
}

export default AnswerList