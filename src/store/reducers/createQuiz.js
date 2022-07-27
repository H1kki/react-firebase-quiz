import {CREATE_QUIZ_QUESTION, RESET_QUESTION} from "../actions/actionTypes";
import axios from "../../axios/axios-quiz";


const initialState = {
    quiz: []
}

export default function createQuizReducer(state = initialState, action) {
    switch(action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            }
        case RESET_QUESTION:
            return {
                ...state,
                quiz: []
            }
        default:
            return state
    }
}