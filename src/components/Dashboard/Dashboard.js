import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Dashboard.css'

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            userPosts: true,
            query: ''
        }
        this.updateInput = this.updateInput.bind(this)
        this.updateCheckbox = this.updateCheckbox.bind(this)
        this.searchPosts = this.searchPosts.bind(this)
        this.reset = this.reset.bind(this)
    }

    updateInput(e) {
        this.setState({
            [e.target.dataset.name]: e.target.value
        })
    }

    updateCheckbox() {
        this.setState({
            userPosts: !this.state.userPosts
        })
    }

    searchPosts() {
        axios.get(`/api/post/?query=${this.state.query}&userPosts=${this.state.userPosts}`)
            .then(res => {
                this.setState({
                    posts: res.data,
                    query: ''
                })
            })
    }

    reset () {
        this.setState({
            query: '',
            userPosts: true
        })
    }

    componentDidMount() {
        axios.get(`/api/post/?query=${this.state.query}&userPosts=${this.state.userPosts}`)
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
    }

    render() {
        const postsMap = this.state.posts.map(post => {
            return (
                //values for these might change depending on the names of properties of the post objects
                <Link key={post.post_id} to={`/post/${post.post_id}`}>
                    <div >
                        <h1>{post.title}</h1>
                        <h3>{post.username}</h3>
                        <img src={post.img} alt='profile' />
                    </div>
                </Link>
            )
        })
        return (
            <div>
                <input onChange={this.updateInput} placeholder='Search by title' data-name='query' value={this.state.query} />
                <button onClick={this.searchPosts}>Search</button>
                <button onClick={this.reset}>Reset</button>
                <label>My Posts</label><input data-name='userPosts' checked={this.state.userPosts} onChange={this.updateCheckbox} type='checkbox' />
                {postsMap}
            </div>
        )
    }
}



export default Dashboard