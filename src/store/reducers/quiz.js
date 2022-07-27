import { FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS, FETCH_QUIZ_SUCCESS, FINISH_QUIZ, QUIZ_RETRY, SET_ANSWER_STATE, SET_NEXT_QUESTION } from "../actions/actionTypes"

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null
}

export default function quizReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_QUIZES_START: 
            return {
                ...state,
                loading: true
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: action.quizes
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            }
        case SET_ANSWER_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            }
        case FINISH_QUIZ: 
            return {
                ...state,
                isFinished: true
            }
        case SET_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: action.number,
                answerState: null
            }
        case QUIZ_RETRY:
            return {
                ...state,
                activeQuestion: 0,
                results: {},
                answerState: null,
                isFinished: false
            }
        default:
            return state
    }
}