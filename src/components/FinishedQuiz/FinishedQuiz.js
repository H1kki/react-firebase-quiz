import React from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = props => {

    const res = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') {
            total++
        }

        return total
    }, 0)


    console.log("res", props.results)
    
    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((questionItem, index) => {
                    const cls = ['fa', props.results[questionItem.id] === 'error' ? 'fa-times' : 'fa-check', 
                        classes[props.results[questionItem.id]]
                    ]


                    return (
                        <li key={index}>
                            {index+1}. {questionItem.question.value} <i className={cls.join(' ')}/>
                        </li>
                    )
                })}
                {/* <li>
                    1. How are you? <i className="fa fa-times"/>
                </li> */}
            </ul>

            <p>{res} /{props.quiz.length}</p>
            <div>
                <Button onClick={props.restart} type="primary">Retry</Button>
                <Link to="/">
                    <Button type="primary">Go to quizes list</Button>
                </Link>
                {/* <button onClick={props.restart}>Retry</button> */}
            </div>
        </div>
    )
}

export default FinishedQuiz