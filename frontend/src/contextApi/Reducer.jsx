export const intialState = {
    user: null,
    team: null
}

export const counterReducer = (state, action) => {
    switch (action.type) {

        case 'USER':
            return state = { ...state, user: action.value };
        case 'TEAM':
            return state = { ...state, team: action.value };
        default:
            return state;
    }
};