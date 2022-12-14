import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import Quiz from './conteiners/Quiz/Quiz'
import QuizList from "./conteiners/QuizList/QuizList";
import QuizCreator from "./conteiners/QuizCreator/QuizCreator";
import Auth from "./conteiners/Auth/Auth";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";

class App extends Component {
  componentDidMount() {
      this.props.autoLogin()
  }

    render() {
    let routes = (
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/" component={QuizList}/>
          <Redirect to={'/'}/>
        </Switch>
    )
    if(this.props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path="/quiz/:id" component={Quiz}/>
            <Route path="/quiz-creator" component={QuizCreator}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/" component={QuizList}/>
            <Redirect to={'/'}/>
          </Switch>
      )
    }
    console.log('jjjj', this.props.isAuthenticated)
    return (
      <Layout>
        { routes }
      </Layout> 
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


