import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux';
import {clickAnswerhandler, fetchQuizById, retryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    
    render() {
        console.log(this.props)
        return(
            <div className={classes.Quiz}>
                <div>
                    <h1>Quiz</h1>
                    {
                    this.props.loading  || !this.props.quiz
                    ? <Loader/>
                    : this.props.isFinished ?
                     <FinishedQuiz
                        quiz={this.props.quiz}
                        results={this.props.results}
                        restart={this.props.retryQuiz}
                      /> 
                        :
                        <ActiveQuiz 
                            answers={this.props.quiz[this.props.activeQuestion].answers}
                            question={this.props.quiz[this.props.activeQuestion].question}
                            onClickAnswer={this.props.clickAnswerhandler}
                            quizLength={this.props.quiz.length}
                            questionNumber={this.props.activeQuestion + 1}
                            state={this.props.answerState}
                        />
                    }
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        loading: state.quiz.loading,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        clickAnswerhandler: answerId => dispatch(clickAnswerhandler(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)