const Account = (
    state = {
        accounts: []
    },
    action
) => {

    const { type, payload } = action;

    switch(type){
        case "SET_ACCOUNTS":
            state = {
                ...state,
                accounts: payload
            }
            break;

        default:
            break;
    }

    return state;
}

export default Account;