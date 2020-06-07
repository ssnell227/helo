import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import {setUser} from '../../ducks/reducer'


class Nav extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
        this.getSessionUser = this.getSessionUser.bind(this)
    }

    getSessionUser () {
        axios.get('/api/auth/getSessionUser')
        .catch(err => console.log(err))
        .then(res => {
            const {username, profile_pic} = res.data[0]
            this.props.setUser(username, profile_pic)
        })
    }

    logout () {
        axios.delete('/api/auth/logout')
        .then(() => this.props.history.push('/'))
    }

    componentDidMount () {
        this.getSessionUser()
    }

    render() {
        return (<div>
                <div>
                    <p>{this.props.username}</p>
                    <img src={this.props.profilePicture} alt='profile'/>
                    <Link to='/dashboard'><button>Home</button></Link>
                    <Link to='/new'><button>New Post</button></Link>
                    <button onClick={this.logout}>Logout</button>
                </div>
        </div>
        )
    }
}

function mapStateToProps (reduxState) {
    const {username, profile_pic} = reduxState
    return {
        username,
        profile_pic
    }
}

export default connect(mapStateToProps, {setUser})(withRouter(Nav))