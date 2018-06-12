import axios from 'axios'

const URL = 'http://localhost:3003/api/todos'

export const changeDescription = evt => ({
    type: 'DESCRIPTION_CHANGED',
    payload: evt.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const s = description ? `&description__regex=/${description}/` : ''
        const request = axios.get(`${URL}?sort=-createdAt${s}`)
            .then(res => dispatch({
                type: 'TODO_SEARCHED',
                payload: res.data
            }))
    }
}

export const add = description => {

    return dispatch => {
        axios.post(URL, { description })
            .then(() => dispatch(search()))
            .then(() => dispatch(clear()))
    }

}

export const markAsDone = todo => {

    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(res => dispatch(search()))
    }
}

export const markAsPending = todo => {

    return dispatch => {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(res => dispatch(search()))
    }
}


export const remove = todo => {

    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
            .then(res => dispatch(search()))
    }
}

export const clear = () => {

    return [
        {
            type: 'TODO_CLEAR'
        },
        search()
    ]
}
