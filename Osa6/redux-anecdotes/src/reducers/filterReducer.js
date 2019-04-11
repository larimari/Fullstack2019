const reducer = (state = '', action) => {

    switch (action.type) {
        case 'SET_FILTER':
            return action.filter

        default: return state
    }

}

export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        filter 
    }
}

export default reducer




/* const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    default:
      return state
  }
}

export const setFilter = filter => {
  return {
    type: 'SET_FILTER',
    filter,
  }
}

export default filterReducer */