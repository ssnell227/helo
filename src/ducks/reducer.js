import axios from "axios"

const initialState = {
    username: '',
    profile_pic: '',
    userId: null,
    loading: false
}

const SET_USER = 'SET_USER'
const GET_USER = 'GET_USER'

export function setUser ( username, profile_pic) {
    return {
        type: SET_USER,
        payload: {username, profile_pic}
    }
}

export function getUser () {
    const payload = axios.get('/api/auth/getSessionUser')
    .catch(err => console.log(err))
    console.log(payload)
    return {
        type: GET_USER,
        payload: payload
    }
}

export default function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            const { username, profile_pic} = action.payload
            return {...state, username, profile_pic}
        case GET_USER + '_PENDING':
            return {...state, loading: true}
        case GET_USER + '_REJECTED':
            return {...state, loading: false}
        case GET_USER + '_FULFILLED':
            return {...state, ...action.payload.data, loading: false}
        default:
            return state
    }
}