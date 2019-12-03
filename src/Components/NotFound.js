import React, { Component } from "react";
import { Link } from 'react-router-dom';
import error from '../img/404-error-template-3.png';


class NotFound extends Component {
    render () {
        return (
        <div>
            <img className="not" src={error}  style={{width: '100%'}}alt='404'/>
            <center><Link to="/">Return to Home Page</Link></center>
        </div>
        );
    }
};

export default NotFound;