import React, { Component } from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {setUser} from '../../ducks/reducer'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
        this.createUser = this.createUser.bind(this)
        this.updateInput = this.updateInput.bind(this)
        this.login = this.login.bind(this)
    }
    updateInput(e) {
        this.setState({
            [e.target.dataset.name]: e.target.value
        })
    }

    createUser() {
        const {username, password} = this.state

        if (!username) {
            return alert('Please enter a username')
        }

        if (!password) {
            return alert('Please enter a password')
        }

        if (username.length > 20) {
            return alert('Username must be shorter than 20 characters')
        }

        axios.post('/api/auth/register', {username, password})
        .then(() => {
            this.props.history.push('/dashboard')
        })
        .catch(err => {console.log(err)
             alert('Username taken, please choose another')
        })
    }

    login (e) {
        e.preventDefault()
        const {username, password} = this.state
        axios.post('/api/auth/login', {username, password})
        .then(res => {
            const {profile_pic, user_id, username} = res.data
            this.props.setUser(user_id, username, profile_pic)
            this.props.history.push('/dashboard')
        })
    }

    render() {
        return (<div>
            <main>
                <h1>Helo</h1>
                <form>
                    <label>Username</label><input value={this.state.username} onChange={this.updateInput} data-name='username' />
                    <label>Password</label><input value={this.state.password} onChange={this.updateInput} type='password' data-name='password' />
                    <input onClick={this.login} type='submit' value='Login' />
                    <button onClick={this.createUser}>Register</button>
                </form>
            </main>
        </div>
        )
    }

}

export default connect(null, {setUser})(Auth)