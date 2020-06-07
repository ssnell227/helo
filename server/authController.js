const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')
        const profile_pic = 'https://p7.hiclipart.com/preview/442/477/305/computer-icons-user-profile-avatar-profile.jpg'

        const userResponse = await db.check_user(username)
        
        if (userResponse[0]) {
            return res.status(400).send('Username taken')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const newUser = await db.register_user(username, hash, profile_pic)

        req.session.user = newUser[0]
        delete req.session.user.password
        res.status(201).send(req.session.user)
    },
    login: async (req, res) => {
        const {username, password} = req.body
        const db = req.app.get('db')

        const user = await db.check_user(username)

        if (!user[0]) {
            return res.status(400).send('Username not found')
        }

        let authenticated = bcrypt.compareSync(password, user[0].password)

        if (!authenticated) {
            return res.status(400).send('Password incorrect')
        }

        delete user[0].password
        req.session.user = user[0]
        res.status(202).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getSessionUser: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.session.user
        const userInfo = await db.get_session_user(user_id)
        .catch(err => console.log(err))
        res.status(200).send(userInfo)
    }
}