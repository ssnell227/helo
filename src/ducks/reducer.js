const initialState = {
    username: '',
    userId: 0,
    profilePicture: ''
}

const SET_USER = 'SET_USER'

export function setUser (userId, username, profilePicture) {
    return {
        type: SET_USER,
        payload: {userId, username, profilePicture}
    }
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            const {userId, username, profilePicture} = action.payload
            return {...state, userId, username, profilePicture}
        default:
            return state
    }
}