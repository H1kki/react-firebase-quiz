import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import classes from './QuizList.module.css'
import axios from "axios";
import Loader from '../../components/UI/Loader/Loader'
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";

class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    }
    

    renderLinks() {
        console.log(this.props)
        return this.props.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
        // try {
        //     const response = await axios.get('https://quiz-react-65a6b-default-rtdb.europe-west1.firebasedatabase.app/quizes.json')
        //     const quizes = []
        //     Object.keys(response.data).forEach((id, index) => {
        //         quizes.push({
        //             id,
        //             name: `Test #${index + 1}`
        //         })

        //         this.setState({
        //             quizes,
        //             loading: false
        //         })
        //     })
        // } catch(e) {
        //     console.log(e)
        // }
    }


    render() {
        console.log(this.state.quizes)
        return(
            <div className={classes.QuizList}>
                <div>
                    <h1>Quizes List</h1>
                    {
                        this.props.loading && this.props.quizes.length !== 0 ?
                        <Loader/> :
                        <ul>
                            { this.renderLinks() }
                        </ul>
                    }
                </div> 
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function dispatchStateToProps(dispatch) {
    return {
        fetchQuizes: () => {
            dispatch(fetchQuizes())
        }
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(QuizList)