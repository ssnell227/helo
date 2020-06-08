import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUser } from '../../ducks/reducer'
import './Auth.css'

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
        const { username, password } = this.state

        if (!username) {
            return alert('Please enter a username')
        }

        if (!password) {
            return alert('Please enter a password')
        }

        if (username.length > 20) {
            return alert('Username must be shorter than 20 characters')
        }

        axios.post('/api/auth/register', { username, password })
            .then(() => {
                this.props.history.push('/dashboard')
            })
            .catch(err => {
                console.log(err)
                alert('Username taken, please choose another')
            })
    }

    login(e) {
        e.preventDefault()
        const { username, password } = this.state
        axios.post('/api/auth/login', { username, password })
            .then(res => {
                const { profile_pic, user_id, username } = res.data
                this.props.setUser(user_id, username, profile_pic)
                this.props.history.push('/dashboard')
            })
    }

    render() {
        return (
            <div className='auth'>
                <main className='auth-container'>
                    <div id='logo-container'>
                        <img id='auth-logo' src='./helo-logo.png' alt='helo-logo' />
                        <h1>Helo</h1>
                    </div>
                    <form className='auth-form'>
                        <label>Username:
                            <input value={this.state.username} onChange={this.updateInput} data-name='username' />
                        </label>
                        <label>Password:
                            <input value={this.state.password} onChange={this.updateInput} type='password' data-name='password' />
                        </label>
                        <div className='auth-button-container'>
                            <input className='dark-button button auth-button' onClick={this.login} type='submit' value='Login' />
                            <button className='dark-button button auth-button' onClick={this.createUser}>Register</button>
                        </div>
                    </form>
                </main>
            </div>
        )
    }

}

export default connect(null, { setUser })(Auth)