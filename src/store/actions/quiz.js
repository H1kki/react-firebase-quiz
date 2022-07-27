import axios from "axios"
import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, FINISH_QUIZ, QUIZ_RETRY, SET_ANSWER_STATE, SET_NEXT_QUESTION } from "./actionTypes"
export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('https://quiz-react-65a6b-default-rtdb.europe-west1.firebasedatabase.app/quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((id, index) => {
                quizes.push({
                    id,
                    name: `Test #${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch(e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizById(id) {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        // try {
            const response = await axios.get(`https://quiz-react-65a6b-default-rtdb.europe-west1.firebasedatabase.app/quizes/${id}.json`)
            const quiz = response.data;
            console.log(quiz)
            dispatch(fetchQuizeSuccess(quiz))
        // } catch(e) {
        //     dispatch(fetchQuizesError(e))
        //     console.log("FETCH QUIZ BY ID")
        // }
        
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizeSuccess(quiz) {
    
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}

export function clickAnswerhandler(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        if(state.answerState) {
            const key = Object.keys(state.answerState)[0]
            console.log(key)
            if(state.answerState[answerId] === 'success') {
                return
            }
        }
        
        const question = state.quiz[state.activeQuestion]
        const results = state.results
        if(answerId === question.rightAnswerId) {
            if(!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(setAnswerState({[answerId] : 'success'}, results))
            const timeout = window.setTimeout(() => {
                if(isQuizFinished(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(setNextQuestion(state.activeQuestion + 1))
                    window.clearTimeout(timeout)
                }
            }, 1000)
        } else {
            results[question.id] = 'error'
            dispatch(setAnswerState({[answerId] : 'error'}, results))
        }
        
    }
}

export function setNextQuestion(number) {
    return {
        type: SET_NEXT_QUESTION,
        number
    }
}

export function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function setAnswerState(answerState, results) {
    return {
        type: SET_ANSWER_STATE,
        answerState,
        results
    }
}

export function finishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function retryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}