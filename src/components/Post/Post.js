import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

class Post extends Component {
    constructor (props) {
        super(props)
        this.state = {
            title: '',
            img: '',
            content: '',
            username: '',
            profile_pic: ''
        }
        this.deletePost = this.deletePost.bind(this)
      }

    componentDidMount () {
        axios.get(`/api/post/byid/${this.props.match.params.postid}`)
        .then(res => {
            const {author_id, title, img, profile_pic, username, content} = res.data[0]
            this.setState({author_id, title, img, content, username, profile_pic})
        })
    }

    deletePost () {
        axios.delete(`/api/post/${this.props.match.params.postid}`)
        .catch(err => console.log(err))
        .then(() => this.props.history.push('/dashboard'))
    }
      
    render () {
        const {title, img, content, username, profile_pic} = this.state
        return (<div>
            <h1>{title}</h1>
            <p>by {username}</p>
            <img src={profile_pic} alt='profile'/>
            <div>
                <img src={img} alt='content'/>
                <p>{content}</p>
            </div>
            {username === this.props.username && <button onClick={this.deletePost}>Delete</button>}
        </div>
        )
    }
}

function mapStateToProps (reduxState) {
    const {username} = reduxState
    return {
        username
    }
}

export default connect(mapStateToProps)(Post)