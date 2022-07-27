import React, {Component} from "react";
import classes from './Drawer.module.css'
import { NavLink } from "react-router-dom";
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = [
    {to: '/', label:'List', exact: true},
    {to: '/quiz-creator', label: "Create Quiz", exact: false},
    {to: '/auth', label: "Auth", exact: false}
]

class Drawer extends Component {

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        onClick={this.props.onClose}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    } 
    
    render() {
        const cls = [classes.Drawer]

        if(!this.props.isOpen) {
            cls.push(classes.close)
        }
        const links = [
            {to: '/', label:'List', exact: true},
        ]
        if(this.props.isAuth) {
            links.push({to: '/quiz-creator', label: "Create Quiz", exact: false}, {to: '/logout', label: "Logout", exact: false})
        } else {
            links.push({to: '/auth', label: "Auth", exact: false})
        }
        return (
            <>
                {this.props.isOpen ? <Backdrop onClose={this.props.onClose}/> : null}
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>  
            </>  
        )
    }
}

export default Drawer