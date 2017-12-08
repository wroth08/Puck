import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavBar extends Component {
    render() {
        return (
            <div className="navBar">
                <Link to="/" className="dashLink"><img src="http://classwithapps.com/wp-content/uploads/2013/02/home.png" alt="link to home" height="50" width="50"/></Link>
                <h1>PUCK ME</h1>
                <Link className="dashLink" to='/standings'><img height="50" width="50" src="https://cdn0.iconfinder.com/data/icons/social-messaging-productivity-4/128/rankings-128.png" alt='link to standings'/></Link>
            </div>
        )
    }
}

export default NavBar