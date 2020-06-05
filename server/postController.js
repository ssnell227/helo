module.exports = {
    createPost: async (req, res) => {
        const { userid } = req.params
        const { title, img, content } = req.body
        const db = req.app.get('db')

        console.log('firing')

        const createdPost = await db.create_post([title, img, content, userid])
            .catch(err => console.log(err))
        if (createdPost) {
            res.sendStatus(200)
        }
    },
    getPostsByQuery: async (req, res) => {
        const { userid } = req.params
        const { query, userPosts } = req.query
        const db = req.app.get('db')

        const posts = await db.get_all_posts()


        if (query === '' && userPosts === 'true') {
            return res.status(200).send(posts)
        } else if (query === '' && userPosts === 'false') {
            const filtered = posts.filter(posts => posts.author_id !== +userid)
            return res.status(200).send(filtered)
        } else if (userPosts === 'true') {
            const filtered = posts.filter(posts => posts.title.toLowerCase().includes(query.toLowerCase()))
            return res.status(200).send(filtered)
        } else if (userPosts === 'false') {
            const filtered = posts.filter(posts => posts.title.toLowerCase().includes(query.toLowerCase()) && posts.user_id !== +userid)
            return res.status(200).send(filtered)
        }

    },
    getPostById: async (req, res) => {
        const { postid } = req.params
        const db = req.app.get('db')
        const post = await db.get_post_by_id(postid)
            .catch(err => console.log(err))
        res.status(200).send(post)
    }
}