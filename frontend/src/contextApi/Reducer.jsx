export const intialState = {
    user: null,
    team: null
}

export const counterReducer = (state, action) => {
    switch (action.type) {

        case 'USER':
            return state.user = action.value;

        default:
            return state;
    }
};