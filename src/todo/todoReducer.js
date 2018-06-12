const INITIAL_STATE = {
    description: '',
    list: []
}


export default (state = INITIAL_STATE, action) => {
    const TYPES = ['DESCRIPTION_CHANGED', 'TODO_SEARCHED', 'TODO_CLEAR']
    const TYPE = action.type

    if(TYPES.indexOf(TYPE) < 0) return state

    if(TYPES[0] == TYPE)
        return { ...state, description: action.payload }

    if(TYPES[1] == TYPE)
        return { ...state, list: action.payload }

    if(TYPES[2] == TYPE)
        return { ...state, description: '' }

}
