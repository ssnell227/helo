import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'


class Nav extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }

    logout () {
        axios.delete('/api/auth/logout')
        .then(() => this.props.history.push('/'))
    }

    render() {
        return (<div>
            {this.props.location.pathname !== '/' &&
                <div>
                    <p>{this.props.username}</p>
                    <img src={this.props.profilePicture} alt='profile'/>
                    <Link to='/dashboard'><button>Home</button></Link>
                    <Link to='/new'><button>New Post</button></Link>
                    <button onClick={this.logout}>Logout</button>
                </div>
            }
        </div>
        )
    }
}

function mapStateToProps (reduxState) {
    const {username, profilePicture} = reduxState
    return {
        username,
        profilePicture
    }
}

export default connect(mapStateToProps)(withRouter(Nav))