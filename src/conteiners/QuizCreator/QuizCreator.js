import React, {Component} from "react";
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Select from "../../components/UI/Select/Select";
import axios from '../../axios/axios-quiz'
import Auxiliary from "../../hoc/Auxillary/Auxillary";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/createQuiz";

function createOptionControl(number) {
    return createControl({
        label: `Enter ${number} answer`,
        errorMessage: 'Answer cannot be empty',
        value: '',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter question',
            errorMessage: 'Question cannot be empty',
            value: ''
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    createQuizHandler = async event => {
            this.setState({
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls()
            })
            this.props.finishCreateQuiz()
    }

    addQuestionHandler = () => {
        const quiz = this.props.quiz.concat()

        const {question, option1, option2, option3, option4} = this.state.formControls
        const questionItem = {
            question,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]

        }
        this.props.createQuizQuestion(questionItem)
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    }

    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true;
        control.value = value
        control.valid = validate(control.value, control.validation)
        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    }

    renderControlInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxiliary key={index}>
                    <Input
                        
                        label={control.label}
                        errorMessage={control.errorMessage}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        shouldValidate={!!control.validation}
                        onChange={e => this.onChangeHandler(e.target.value, controlName)}
                    />
                    { index === 0 ? <hr key={index+controlName}/> : null }
                </Auxiliary>
                
            )
        })
    }
    
    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {
        return(
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Create Quiz</h1>

                    <form onSubmit={e => this.submitHandler(e)}>
                        { this.renderControlInputs() }
                        <Select 
                        label="Pick right answer"
                        value={this.state.rightAnswerId}
                        onChange={this.selectChangeHandler}
                        options={[
                            {text: 1, value: 1},
                            {text: 2, value: 2},
                            {text: 3, value: 3},
                            {text: 4, value: 4},
                        ]}
                        />
                        <Button
                            type="primary"
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >Add question</Button>
                        <Button
                            type="success"
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >Create Quiz</Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);
