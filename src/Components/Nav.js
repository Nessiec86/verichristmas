import React, { Component } from "react";
import logoveri from '../img/layout_set_logo.png';
import logojuegos from '../img/logojuegos.jpeg';

class Nav extends Component {
    
    handleReturn = () => {
        window.history.back()
    }

    render() {

        return (
            <nav className='nav'>
                <div>
                    <img src={logoveri} alt="veri" style={{width: '5rem'}}></img>
                    {/* <img src={logojuegos} alt="veri" style={{width: '75%'}}></img> */}
                </div>
                {/* <div>
                    <button onClick={()=> this.handleReturn()}><img src={arrow} alt="log" style={{width: '2.5rem', height: '1rem'}}/></button>
                </div> */}
            </nav>
        );
    }
}

export default Nav;