const reducer = (state = '', action) => {

  console.log('reducer state now: ', state)
  console.log('action', action)

    switch (action.type) {
        case 'FILTER':
            return action.data

        default: return state
    }

}

export const setFilter = (filter) => {
    return {
        type: 'FILTER',
        data: filter 
    }
}

export default reducer