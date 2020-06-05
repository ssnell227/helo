import React, {Component} from 'react'
import axios from 'axios'

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
      }

    componentDidMount () {
        axios.get(`/api/post/byid/${this.props.match.params.postid}`)
        .then(res => {
            console.log(res)
            const {title, img, profile_pic, username, content} = res.data[0]
            this.setState({title, img, content, username, profile_pic})
        })
        
    }
      
    render () {
        const {title, img, content, username, profilePic} = this.state
        return (<div>
            <h1>{title}</h1>
            <p>by {username}</p>
            <img src={profilePic} alt='profile'/>
            <div>
                <img src={img} alt='content'/>
                <p>{content}</p>
            </div>
        </div>
        )
    }
}

export default Post