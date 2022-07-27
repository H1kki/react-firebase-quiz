import React from "react";
import classes from './ActiveQuiz.module.css'
import AnswerList from "./AnswerList/AnswerList";

const ActiveQuiz = props => {
    return(    
    <div className={classes.ActiveQuiz }>
        <p className={classes.Question}>
            <span>{props.questionNumber}. {props.question.value}</span>
            <span>{props.questionNumber}/{props.quizLength}</span>
        </p>

        <AnswerList 
        answers={props.answers}
        onClickAnswer={props.onClickAnswer}
        state={props.state}
        />

    </div>
    )

}

export default ActiveQuiz
