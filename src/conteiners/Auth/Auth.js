import React, {Component} from "react";
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from "../../components/UI/Input/Input";
import is from "is_js";
import axios from "axios";
import {connect} from "react-redux";
import {auth} from '../../store/actions/auth'


class Auth extends Component {
    

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter correct Email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter correct Password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        } 
    }

    formHandler = e => {
        e.preventDefault();
    }

    validateControl(value, validation) {
        if(!validation) {
            return true
        }

        let isValid = true;

        if(validation.required) {
            isValid = value.trim !== '' && isValid
        }

        if(validation.email) {
            isValid = is.email(value) && isValid
        }

        if(validation.minLength) {
            isValid = value.length >= 6 && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation)
        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        formControls[controlName] = control
        this.setState({
            formControls, isFormValid
        })
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return <Input
                key={controlName + index}
                type={control.type}
                value={control.value}
                label={control.label}
                errorMessage={control.errorMessage}
                valid={control.valid}
                touched={control.touched}
                shouldValidate={!!control.validation}
                onChange={(e) => this.onChangeHandler(e, controlName)}
            />
        })
    }

    loginHandler = () => {
        this.props.auth(this.state.formControls.email.value,
            this.state.formControls.password.value,
            true)
    }

    registerHandler = () => {
        console.log(this.props)
        this.props.auth(this.state.formControls.email.value,
            this.state.formControls.password.value,
            false)
    }

    render() {
        console.log(this.state.isFormValid)
        return(
            <div className={classes.Auth}>
                <div>
                    <h1>Auth</h1>
                    <form onSubmit={this.formHandler} className={classes.Form}>
                        { this.renderInputs() }
                        <Button
                            onClick={this.loginHandler}
                            type="primary"
                            disabled={!this.state.isFormValid}
                        >Login</Button>

                        <Button
                            onClick={this.registerHandler}
                            type="primary"
                            disabled={!this.state.isFormValid}
                        >Register</Button>

                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    };
}

export default connect(null, mapDispatchToProps)(Auth)