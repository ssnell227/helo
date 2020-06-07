import React, { Component } from 'react'
import axios from 'axios'

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
            <div>
                <form>
                    <h1>New Post</h1>
                    <label>Title:</label><input data-name='title' value={this.state.title} onChange={this.updateInput} />
                    <img src={this.state.img} alt='content' />
                    <label>Image URL:</label><input data-name='img' value={this.state.img} onChange={this.updateInput} />
                    <label>Content</label><input data-name='content' value={this.state.content} onChange={this.updateInput} />
                    <input type='submit' onClick={this.createPost} value='Post'/>
                </form>
            </div>
        )
    }
}



export default Form