const reducer = (state = '', action) => {

    switch (action.type) {
        case 'CREATE_NOTIFICATION':
            return action.data.content

        default: return state
    }

}

export const createNotification = (content) => {

    return {
        type: 'CREATE_NOTIFICATION',
        data: {
            content
        }
    }
}

export default reducer