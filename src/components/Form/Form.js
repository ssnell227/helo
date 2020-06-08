import React, { Component } from 'react'
import axios from 'axios'
import './Form.css'

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            img: '',
            content: ''
        }
        this.updateInput = this.updateInput.bind(this)
        this.createPost = this.createPost.bind(this)
    }

    updateInput(e) {
        this.setState({
            [e.target.dataset.name]: e.target.value
        })
    }

    createPost(e) {
        e.preventDefault()
        const { title, img, content } = this.state
        axios.post(`/api/post`, { title, img, content })
            .then(() => this.props.history.push('/dashboard'))
    }

    render() {
        return (
            <div className='form-container'>
                <form className='form white-box'>
                    <h1>New Post</h1>
                    <div className='inputs'>
                        <label>Title:</label><input data-name='title' value={this.state.title} onChange={this.updateInput} />
                        <img src={this.state.img} alt='content' />
                        <label>Image URL:</label><input data-name='img' value={this.state.img} onChange={this.updateInput} />
                        <label>Content:</label><textarea rows='6' data-name='content' value={this.state.content} onChange={this.updateInput} />
                    </div>
                    <input className='dark-button post-button' type='submit' onClick={this.createPost} value='Post' />
                </form>
            </div>
        )
    }
}



export default Form