import React, { Component } from 'react'
import {connect} from 'react-redux'
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

    createPost () {
        const {title, img, content} = this.state
        axios.post(`/api/posts/${this.props.userid}`, {title, img, content})
        .then(() => this.props.history.push('/'))
    }

    render() {
        return (
            <div>
                <h1>New Post</h1>
                <label>Title:</label><input data-name='title' value={this.state.title} onChange={this.updateInput} />
                <img />
                <label>Image URL:</label><input data-name='img' value={this.state.img} onChange={this.updateInput} />
                <label>Content</label><input data-name='content' value={this.state.content} onChange={this.updateInput} />
                <button onClick={this.createPost}>Post</button>
            </div>
        )
    }
}

function mapStateToProps (reduxState) {
    const { userId } = reduxState
    return {
        userId
    }
}

export default connect(mapStateToProps)(Form)